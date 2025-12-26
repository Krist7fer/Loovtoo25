document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main section');
    const navButtons = document.querySelectorAll('aside button');

    let currentIndex = 0;
    sections[currentIndex].classList.add('active');
    navButtons[currentIndex].classList.add('active');

    function showSection(index) {
        if (index < 0) index = 0;
        if (index >= sections.length) index = sections.length - 1;

        sections.forEach((sec, i) => sec.classList.toggle('active', i === index));
        navButtons.forEach((btn, i) => btn.classList.toggle('active', i === index));
        currentIndex = index;

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.dataset.section);
            showSection(index);
        });
    });

    sections.forEach((section, idx) => {
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('section-btns');

        const goUp = document.createElement('button');
        goUp.innerHTML = '<i class="fas fa-arrow-up"></i>ÜLES';
        goUp.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        btnContainer.appendChild(goUp);

        function updateGoUpButton() {
            if (window.scrollY === 0) {
                goUp.disabled = true;
                goUp.style.opacity = "0.5";
            } else {
                goUp.disabled = false;
                goUp.style.opacity = "1";
            }
        }

        updateGoUpButton();
        window.addEventListener('scroll', updateGoUpButton);

        if (idx < sections.length - 1) {
            const next = document.createElement('button');
            next.innerHTML = 'JÄRGMINE<i class="fas fa-arrow-right"></i>';
            next.addEventListener('click', () => showSection(idx + 1));
            btnContainer.appendChild(next);
        }

        section.appendChild(btnContainer);
    });
});
