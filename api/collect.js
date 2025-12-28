import { kv } from '@vercel/kv';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method Not Allowed' });
        return;
    }

    const data = req.body;
    if (!data) {
        res.status(400).json({ error: 'No data' });
        return;
    }

    const key = `entry:${Date.now()}`;
    await kv.set(key, data, { ex: 60 * 60 * 24 * 7 });

    res.status(200).json({ success: true });
}
