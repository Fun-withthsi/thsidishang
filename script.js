const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');

const THEME_KEY = 'portfolio-theme';
const savedTheme = localStorage.getItem(THEME_KEY);
const initialTheme = savedTheme || 'dark';

document.body.setAttribute('data-theme', initialTheme);

function updateThemeButton(theme) {
    if (!themeToggle) {
        return;
    }

    const isDark = theme === 'dark';
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

updateThemeButton(initialTheme);

themeToggle?.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
    updateThemeButton(nextTheme);
});

menuToggle?.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        menuToggle?.setAttribute('aria-expanded', 'false');
    });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || targetId === '#') {
            return;
        }

        const target = document.querySelector(targetId);
        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

function highlightCurrentSection() {
    const sections = document.querySelectorAll('main section[id]');
    let current = '';

    sections.forEach((section) => {
        const top = section.offsetTop;
        if (window.scrollY >= top - 140) {
            current = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isCurrent = link.getAttribute('href') === `#${current}`;
        link.classList.toggle('active', isCurrent);
    });
}

window.addEventListener('scroll', highlightCurrentSection);
highlightCurrentSection();

function setupAnimatedTabs(groupName, tabSelector, panelSelector) {
    const tabs = document.querySelectorAll(tabSelector);
    const panels = document.querySelectorAll(panelSelector);

    if (!tabs.length || !panels.length) {
        return;
    }

    let isSwitching = false;

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            if (isSwitching || tab.classList.contains('active')) {
                return;
            }

            const target = tab.getAttribute('data-target');
            const currentPanel = document.querySelector(`${panelSelector}.active[data-group="${groupName}"]`);
            const nextPanel = document.querySelector(`${panelSelector}[data-group="${groupName}"][data-panel="${target}"]`);

            if (!nextPanel) {
                return;
            }

            isSwitching = true;

            tabs.forEach((item) => {
                item.classList.remove('active');
                item.setAttribute('aria-selected', 'false');
            });

            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            const showNextPanel = () => {
                panels.forEach((panel) => {
                    if (panel.getAttribute('data-group') !== groupName) {
                        return;
                    }
                    panel.classList.remove('active', 'is-entering', 'is-exiting');
                    panel.hidden = true;
                });

                nextPanel.hidden = false;
                nextPanel.classList.add('active', 'is-entering');
                nextPanel.classList.add('visible');

                requestAnimationFrame(() => {
                    nextPanel.classList.remove('is-entering');
                });

                window.setTimeout(() => {
                    isSwitching = false;
                }, 250);
            };

            if (currentPanel) {
                currentPanel.classList.add('is-exiting');
                window.setTimeout(showNextPanel, 180);
            } else {
                showNextPanel();
            }
        });
    });
}

setupAnimatedTabs('experience', '.xp-tab', '.experience-card');
setupAnimatedTabs('skills', '.panel-tab[data-group="skills"]', '.panel-card');
setupAnimatedTabs('credentials', '.panel-tab[data-group="credentials"]', '.panel-card');

function setupScrollReveal() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealTargets = document.querySelectorAll(
        '.hero .eyebrow, .hero-title, .hero-description, .hero-actions, .section-title, .stats-grid li, .experience-tabs, .experience-card, .panel-tabs, .panel-card, .contact-form, .contact-list li, .social-links'
    );

    revealTargets.forEach((element, index) => {
        element.classList.add('reveal');
        element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 70}ms`);

        const isTabPanel = element.matches('.experience-card, .panel-card');
        if (isTabPanel && !element.hidden) {
            element.classList.add('visible');
        }
    });

    if (prefersReducedMotion) {
        revealTargets.forEach((element) => {
            element.classList.add('visible');
        });
        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -8% 0px'
        }
    );

    revealTargets.forEach((element) => {
        if (!element.hidden) {
            revealObserver.observe(element);
        }
    });
}

setupScrollReveal();
