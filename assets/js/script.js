// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll progress indicator
const scrollProgress = document.getElementById('scrollProgress');
if (scrollProgress) {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const heroBackgroundVideo = document.getElementById('heroBackgroundVideo');
    
    setTimeout(function() {
        loadingScreen.classList.add('hidden');
        
        if (heroBackgroundVideo) {
            setTimeout(function() {
                heroBackgroundVideo.classList.add('visible');
                heroBackgroundVideo.play().catch(function(error) {
                    console.log('Video autoplay failed:', error);
                });
            }, 800);
        }
    }, 500);
});

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenuLeft = document.getElementById('navMenuLeft');
    const navMenuRight = document.getElementById('navMenuRight');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const heroLogoInitial = document.getElementById('heroLogoInitial');
    const heroContent = document.getElementById('heroContent');
    
    let scrollStage = 0;
    let lastScrollY = window.scrollY;
    let ticking = false;

    mobileMenuBtn.addEventListener('click', function() {
        navMenuLeft.classList.toggle('active');
        navMenuRight.classList.toggle('active');
        const icon = this.querySelector('i');
        if (navMenuLeft.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenuLeft.classList.remove('active');
            navMenuRight.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    navbar.classList.add('hidden');
                } else if (currentScrollY < lastScrollY) {
                    navbar.classList.remove('hidden');
                }
                
                if (currentScrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                if (currentScrollY >= 300) {
                    if (scrollStage !== 1) {
                        scrollStage = 1;
                        heroLogoInitial.classList.add('hidden');
                        heroContent.classList.remove('hidden');
                        heroContent.classList.add('visible');
                    }
                } else if (currentScrollY < 300) {
                    if (scrollStage !== 0) {
                        scrollStage = 0;
                        heroLogoInitial.classList.remove('hidden');
                        heroContent.classList.remove('visible');
                        heroContent.classList.add('hidden');
                    }
                }
                
                lastScrollY = currentScrollY;
                ticking = false;
            });
            ticking = true;
        }
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    const cvForm = document.getElementById('cvForm');
    if (cvForm) {
        cvForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            alert('Thank you for your application! We will review your CV and contact you if there is a suitable opportunity.');
            this.reset();
        });
    }

    // Advanced Scroll-Triggered Animation System
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    // Section Page Transitions
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                entry.target.classList.remove('section-hidden');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px 0px -50px 0px'
    });

    // Observe all main sections for page transitions
    document.querySelectorAll('section').forEach((section, index) => {
        // Hero section is already visible, don't animate it on load
        if (index === 0) {
            section.classList.add('section-visible');
        } else {
            section.classList.add('section-transition');
        }
        sectionObserver.observe(section);
    });

    // Element fade-in observer
    const elementObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Animate various elements with stagger
    const animatedElements = document.querySelectorAll('.service-card, .contact-item, .logo-item, .vacancy-form, .career-info');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = `opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`;
        elementObserver.observe(el);
    });

    // Parallax scroll effect for sections
    let scrollPos = 0;
    window.addEventListener('scroll', () => {
        scrollPos = window.pageYOffset;
        
        // Parallax effect for about section shapes
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
            const aboutRect = aboutSection.getBoundingClientRect();
            if (aboutRect.top < window.innerHeight && aboutRect.bottom > 0) {
                const offset = (aboutRect.top - window.innerHeight) * 0.3;
                document.querySelectorAll('.floating-shapes .shape').forEach((shape, index) => {
                    shape.style.transform = `translate(${offset * (index + 1) * 0.05}px, ${offset * 0.1}px)`;
                });
            }
        }

        // Parallax for geo decorations
        const geoSection = document.querySelector('.geo-footprint-section');
        if (geoSection) {
            const geoRect = geoSection.getBoundingClientRect();
            if (geoRect.top < window.innerHeight && geoRect.bottom > 0) {
                const offset = (geoRect.top - window.innerHeight) * 0.2;
                document.querySelectorAll('.map-decoration').forEach((deco, index) => {
                    deco.style.transform = `translate(${offset * (index === 0 ? 1 : -1) * 0.08}px, ${offset * 0.08}px)`;
                });
            }
        }
    });

    // Enhanced About Section Animations
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        // 3D card tilt effect on mouse move
        const valueCards = document.querySelectorAll('.value-card');
        valueCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 15;
                const rotateY = (centerX - x) / 15;
                
                card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
            });
        });
    }

    const videoSoundToggle = document.getElementById('videoSoundToggle');
    const introVideo = document.getElementById('introVideo');
    
    if (videoSoundToggle && introVideo) {
        videoSoundToggle.addEventListener('click', function() {
            if (introVideo.muted) {
                introVideo.muted = false;
                this.classList.add('unmuted');
                this.querySelector('i').classList.remove('fa-volume-mute');
                this.querySelector('i').classList.add('fa-volume-up');
            } else {
                introVideo.muted = true;
                this.classList.remove('unmuted');
                this.querySelector('i').classList.remove('fa-volume-up');
                this.querySelector('i').classList.add('fa-volume-mute');
            }
        });
    }

    const locationMarkers = document.querySelectorAll('.location-marker');
    let activeMarker = null;
    
    if (locationMarkers.length > 0) {
        const mapObserver = new IntersectionObserver(function(entries) {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'scale(1)';
                    }, index * 50);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        locationMarkers.forEach((marker, index) => {
            marker.style.opacity = '0';
            marker.style.transform = 'scale(0)';
            marker.style.transition = `opacity 0.5s ease ${index * 0.05}s, transform 0.5s ease ${index * 0.05}s`;
            mapObserver.observe(marker);
            
            marker.addEventListener('click', function(e) {
                e.stopPropagation();
                
                if (activeMarker && activeMarker !== this) {
                    activeMarker.classList.remove('active');
                }
                
                if (activeMarker === this) {
                    this.classList.remove('active');
                    activeMarker = null;
                } else {
                    this.classList.add('active');
                    activeMarker = this;
                }
            });
        });

        document.addEventListener('click', function(e) {
            if (activeMarker && !e.target.closest('.location-marker')) {
                activeMarker.classList.remove('active');
                activeMarker = null;
            }
        });

        const mapWrapper = document.querySelector('.map-wrapper');
        if (mapWrapper) {
            let isDown = false;
            let startX, startY, scrollLeft, scrollTop;

            mapWrapper.addEventListener('touchstart', function(e) {
                const marker = e.target.closest('.location-marker');
                if (marker) {
                    const location = marker.dataset.location;
                    const locationName = marker.querySelector('.location-name').textContent;
                    const locationNumber = marker.querySelector('.location-number');
                    const numberText = locationNumber ? ` (${locationNumber.textContent})` : '';
                    
                    console.log(`Location: ${locationName}${numberText}`);
                }
            });
        }
    }
});
