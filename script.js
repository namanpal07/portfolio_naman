/**
 * Naman Pal - Personal Portfolio
 * Clean, lightweight, and accessible vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Sticky Header Scroll Effect ---
    const siteHeader = document.getElementById('site-header');

    const handleScroll = () => {
        if (window.scrollY > 20) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- 2. Mobile Navigation Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            navToggle.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // Close mobile menu when clicking any nav link
        navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    navToggle.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (event) => {
            if (navLinks.classList.contains('open') &&
                !navLinks.contains(event.target) &&
                !navToggle.contains(event.target)) {
                navLinks.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // --- 3. Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section[id]');

    const updateActiveNavLink = () => {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (correspondingNavLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    navLinkItems.forEach(link => link.classList.remove('active'));
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    };

    window.addEventListener('scroll', updateActiveNavLink, { passive: true });

    // --- 4. Copy Email to Clipboard ---
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const toast = document.getElementById('toast');
    let toastTimeout;

    const showToast = (message) => {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = 'namancse9258@gmail.com';
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(email);
                } else {
                    // Fallback for older environments
                    const tempInput = document.createElement('textarea');
                    tempInput.value = email;
                    tempInput.style.position = 'fixed';
                    tempInput.style.opacity = '0';
                    document.body.appendChild(tempInput);
                    tempInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempInput);
                }
                showToast('Email copied to clipboard: ' + email);
            } catch (err) {
                showToast('Email address: ' + email);
            }
        });
    }

    // --- 5. Functional Email Composer Form ---
    const contactForm = document.getElementById('contact-email-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('sender-name')?.value.trim() || '';
            const email = document.getElementById('sender-email')?.value.trim() || '';
            const subject = document.getElementById('message-subject')?.value.trim() || 'Portfolio Inquiry';
            const message = document.getElementById('message-body')?.value.trim() || '';

            const recipient = 'namancse9258@gmail.com';
            const formattedBody = `Hi Naman,\n\n${message}\n\n---\nFrom: ${name}\nEmail: ${email}`;

            const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;

            // Open in user's default email client
            window.location.href = mailtoUrl;

            showToast('Opening your default email client...');
        });
    }
});
