window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(function() {
        loadingScreen.classList.add('hidden');
    }, 3500);
});

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenuLeft = document.getElementById('navMenuLeft');
    const navMenuRight = document.getElementById('navMenuRight');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const heroLogoInitial = document.getElementById('heroLogoInitial');
    const signatureText = document.getElementById('signatureText');
    const heroContent = document.getElementById('heroContent');
    
    let scrollStage = 0;

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
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        if (window.scrollY > 50 && scrollStage === 0) {
            scrollStage = 1;
            heroLogoInitial.classList.add('hidden');
            setTimeout(function() {
                signatureText.classList.add('visible');
            }, 200);
        }
        
        if (window.scrollY > 300 && scrollStage === 1) {
            scrollStage = 2;
            setTimeout(function() {
                heroContent.classList.add('visible');
            }, 500);
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
});
