window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const heroBackgroundVideo = document.getElementById('heroBackgroundVideo');
    
    if (heroBackgroundVideo) {
        heroBackgroundVideo.classList.add('visible');
        heroBackgroundVideo.play().catch(function(error) {
            console.log('Video autoplay failed:', error);
        });
    }
    
    setTimeout(function() {
        loadingScreen.classList.add('hidden');
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

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .value-card, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

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
