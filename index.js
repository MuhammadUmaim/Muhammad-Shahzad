        // Smooth scroll for any internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Enhanced Intersection Observer for timeline items with staggered animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateX(-30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all timeline items
        document.querySelectorAll('.timeline-item').forEach(item => {
            observer.observe(item);
        });

        // Observe skill categories with staggered effect
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                    
                    skillObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-category').forEach(item => {
            skillObserver.observe(item);
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < hero.offsetHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Add ripple effect to skill tags
        document.querySelectorAll('.skill-tag').forEach(tag => {
            tag.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.5)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s ease-out';
                ripple.style.pointerEvents = 'none';
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add CSS for ripple animation dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Counter animation for years of experience
        const animateCounter = (element, target, duration) => {
            let start = 0;
            const increment = target / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start);
                }
            }, 16);
        };

        // Observe summary section for counter animation
        const summaryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const summary = entry.target;
                    const text = summary.textContent;
                    if (text.includes('22 years')) {
                        // Add subtle highlight effect
                        summary.style.transition = 'all 0.6s ease';
                        summary.style.transform = 'scale(1.01)';
                        setTimeout(() => {
                            summary.style.transform = 'scale(1)';
                        }, 600);
                    }
                    summaryObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const summaryElement = document.querySelector('.summary');
        if (summaryElement) {
            summaryObserver.observe(summaryElement);
        }

        // Add hover sound effect simulation (visual feedback)
        document.querySelectorAll('.timeline-item, .skill-category, .education-card').forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            });
        });

        // Lazy load animation for profile items
        const profileObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 80);
                    profileObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.profile-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.5s ease';
            profileObserver.observe(item);
        });

        // Add year display badge to education card on scroll
        const educationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '0';
                    entry.target.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        entry.target.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, 100);
                    educationObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        const educationCard = document.querySelector('.education-card');
        if (educationCard) {
            educationObserver.observe(educationCard);
        }



       