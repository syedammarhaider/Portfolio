  // Enhanced JavaScript for Responsiveness and Interactivity
        document.addEventListener('DOMContentLoaded', function() {
            // Preloader
            window.addEventListener('load', () => {
                const preloader = document.getElementById('preloader');
                preloader.classList.add('hidden');
                setTimeout(() => preloader.remove(), 500);
            });

            // Mobile Menu
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            const mainNav = document.getElementById('mainNav');
            const navLinks = document.querySelectorAll('.nav-link');

            mobileMenuToggle.addEventListener('click', () => {
                mobileMenuToggle.classList.toggle('active');
                mainNav.classList.toggle('active');
            });

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                });
            });

            // Close menu on outside click
            document.addEventListener('click', (e) => {
                if (!mainNav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    mobileMenuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                }
            });

            // Close menu on resize to desktop
            window.addEventListener('resize', () => {
                if (window.innerWidth > 992) {
                    mobileMenuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                }
            });

            // Theme Toggle
            const themeToggle = document.getElementById('themeToggle');
            const html = document.documentElement;
            const currentTheme = localStorage.getItem('theme') || 'light';

            html.setAttribute('data-theme', currentTheme);
            if (currentTheme === 'dark') {
                themeToggle.querySelector('.fa-sun').style.opacity = '0';
                themeToggle.querySelector('.fa-moon').style.opacity = '1';
            }

            themeToggle.addEventListener('click', () => {
                const isDark = html.getAttribute('data-theme') === 'dark';
                html.setAttribute('data-theme', isDark ? 'light' : 'dark');
                localStorage.setItem('theme', isDark ? 'light' : 'dark');
                themeToggle.querySelectorAll('i').forEach(icon => {
                    icon.style.opacity = icon.classList.contains('fa-sun') ? (isDark ? '1' : '0') : (isDark ? '0' : '1');
                });
            });

            // Header Scroll Effect
            const header = document.getElementById('header');
            window.addEventListener('scroll', () => {
                header.classList.toggle('scrolled', window.scrollY > 100);
            });

            // Back to Top
            const backToTop = document.getElementById('backToTop');
            window.addEventListener('scroll', () => {
                backToTop.classList.toggle('active', window.scrollY > 300);
            });

            backToTop.addEventListener('click', (e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            // Smooth Scrolling for Nav Links
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                });
            });

            // Projects Filter with Smooth Transitions
            const filterButtons = document.querySelectorAll('.filter-btn');
            const projectCards = document.querySelectorAll('.project-card');

            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    const filterValue = button.getAttribute('data-filter');

                    projectCards.forEach((card, index) => {
                        const category = card.getAttribute('data-category');
                        if (filterValue === 'all' || category === filterValue) {
                            card.style.display = 'block';
                            setTimeout(() => card.classList.add('fade-in-up', `delay-${index % 4 + 1}`), 100);
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });

            // Contact Form Submission
            const contactForm = document.getElementById('contactForm');
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Simulate form submission (replace with actual API call)
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactForm.reset();
            });

            // Newsletter Form
            document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Subscribed successfully!');
                e.target.reset();
            });

            // Scroll Animations with Intersection Observer
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .service-card, .project-card, .blog-card, .skill-item, .tool-item').forEach(el => {
                observer.observe(el);
            });

            // Custom Cursor Effects (Desktop Only)
            const cursor = {
                dot: document.querySelector('.cursor-dot'),
                outline: document.querySelector('.cursor-outline')
            };

            if (window.matchMedia('(pointer: fine)').matches) {
                document.addEventListener('mousemove', (e) => {
                    cursor.dot.style.left = e.clientX + 'px';
                    cursor.dot.style.top = e.clientY + 'px';
                    cursor.outline.style.left = e.clientX + 'px';
                    cursor.outline.style.top = e.clientY + 'px';
                });

                const hoverables = document.querySelectorAll('a, button, .project-card, .service-card, .blog-card, .tool-item, .info-item');
                hoverables.forEach(el => {
                    el.addEventListener('mouseenter', () => {
                        cursor.dot.style.transform = 'translate(-50%, -50%) scale(2)';
                        cursor.outline.style.transform = 'translate(-50%, -50%) scale(2)';
                        cursor.outline.style.borderColor = 'transparent';
                        cursor.outline.style.backgroundColor = 'rgba(0, 123, 255, 0.2)';
                    });
                    el.addEventListener('mouseleave', () => {
                        cursor.dot.style.transform = 'translate(-50%, -50%) scale(1)';
                        cursor.outline.style.transform = 'translate(-50%, -50%) scale(1)';
                        cursor.outline.style.borderColor = 'var(--primary-color)';
                        cursor.outline.style.backgroundColor = 'transparent';
                    });
                });
            }

            // Typewriter Effect for Hero Tagline
            const tagline = document.querySelector('.hero-tagline');
            if (tagline) {
                const text = tagline.textContent;
                tagline.textContent = '';
                let i = 0;
                const type = setInterval(() => {
                    tagline.textContent += text[i++];
                    if (i > text.length) clearInterval(type);
                }, 100);
            }

            // Progress Bars Animation on Scroll
            const skillProgress = document.querySelectorAll('.skill-progress');
            const skillObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.width = entry.target.style.width || entry.target.dataset.width;
                        skillObserver.unobserve(entry.target);
                    }
                });
            });
            skillProgress.forEach(bar => skillObserver.observe(bar));
        });