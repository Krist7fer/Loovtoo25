(function () {
    "use strict";

    const result = {};
    const errors = [];

    function record(key, value) {
        result[key] = value;
    }

    function recordError(where, err) {
        errors.push({
            where,
            message: err && err.message ? err.message : String(err)
        });
    }

    async function runFingerprintJS() {
        if (!window.FingerprintJS) {
            record("fingerprintjs", "NOT LOADED");
            return;
        }

        try {
            const fp = await FingerprintJS.load();
            const res = await fp.get();

            record("fingerprintjs.visitorId", res.visitorId);
            record("fingerprintjs.confidence", res.confidence || null);
            record("fingerprintjs.components", res.components);
        } catch (e) {
            recordError("FingerprintJS", e);
        }
    }

    function runClientJS() {
        if (!window.ClientJS) {
            record("clientjs", "NOT LOADED");
            return;
        }

        try {
            const client = new ClientJS();

            record("clientjs.fingerprint", client.getFingerprint());
            record("clientjs.browser", client.getBrowser());
            record("clientjs.browserVersion", client.getBrowserVersion());
            record("clientjs.os", client.getOS());
            record("clientjs.osVersion", client.getOSVersion());
            record("clientjs.timezone", client.getTimeZone());
            record("clientjs.language", client.getLanguage());
            record("clientjs.canvas", client.getCanvasPrint());
        } catch (e) {
            recordError("ClientJS", e);
        }
    }

    function displayAndEnableDownload() {
        if (errors.length > 0) {
            result.errors = errors;
        }

        const json = JSON.stringify(result, null, 2);

        const outputEl = document.getElementById("output");
        if (outputEl) {
            outputEl.textContent = json;
        }

        const btn = document.getElementById("download");
        if (btn) {
            btn.onclick = () => {
                const blob = new Blob([json], { type: "application/json" });
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = "fingerprint-results.json";
                a.click();
            };
        }
    }

    async function main() {
        await runFingerprintJS();
        runClientJS();
        displayAndEnableDownload();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", main);
    } else {
        main();
    }
})();
