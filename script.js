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
        const scrollPosition = window.scrollY + 120;

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

    // --- 4. Working Contact Form (Mailto) ---
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('contact-name')?.value.trim() || '';
            const email = document.getElementById('contact-email')?.value.trim() || '';
            const message = document.getElementById('contact-message')?.value.trim() || '';

            const recipient = 'namancse9258@gmail.com';
            const subject = `Portfolio Inquiry from ${name}`;
            const body = `Hi Naman,\n\n${message}\n\n---\nSender: ${name}\nEmail: ${email}`;

            const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';

            if (submitBtn) {
                submitBtn.innerHTML = '<span>Opening Email Client...</span>';
                submitBtn.disabled = true;
            }

            // Trigger email client
            window.location.href = mailtoUrl;

            setTimeout(() => {
                if (submitBtn) {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }, 2500);
        });
    }
});
