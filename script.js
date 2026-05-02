document.addEventListener("DOMContentLoaded", () => {
    // 1. Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-scroll');
    fadeElements.forEach(el => observer.observe(el));

    // 3. Mobile Navigation Menu Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav a');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            
            // Burger Animation Toggle
            burger.classList.toggle('toggle');
            const lines = burger.querySelectorAll('div');
            if (nav.classList.contains('nav-active')) {
                lines[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                lines.forEach(line => line.style = '');
            }
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                const lines = burger.querySelectorAll('div');
                lines.forEach(line => line.style = '');
            });
        });
    }

    // 4. Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
});
