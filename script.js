// Enhanced script.js with improved animations and functionality
document.addEventListener('DOMContentLoaded', () => {
    // Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav__link');
    let menuOpen = false;
    
    menuBtn.addEventListener('click', () => {
        if(!menuOpen) {
            menuBtn.classList.add('open');
            nav.classList.add('open');
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            nav.classList.remove('open');
            menuOpen = false;
        }
    });
    
    // Close menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            nav.classList.remove('open');
            menuOpen = false;
        });
    });
    
    // Typing Animation
    const words = ['Web Developer', 'Frontend Specialist', 'Python Developer', 'AI/ML Enthusiast', 'Problem Solver'];
    let wordIndex = 0;
    let letterIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deleteSpeed = 50;
    const waitTime = 2000;
    
    function type() {
        const current = words[wordIndex];
        const subtitle = document.querySelector('.hero__subtitle--animated');
        
        if (isDeleting) {
            subtitle.textContent = current.substring(0, letterIndex - 1);
            letterIndex--;
        } else {
            subtitle.textContent = current.substring(0, letterIndex + 1);
            letterIndex++;
        }
        
        // Add blinking cursor effect
        const cursor = document.querySelector('.cursor');
        cursor.style.opacity = '1';
        setTimeout(() => {
            cursor.style.opacity = '0';
        }, 500);
        
        if (!isDeleting && letterIndex === current.length) {
            setTimeout(() => {
                isDeleting = true;
            }, waitTime);
        } else if (isDeleting && letterIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        setTimeout(type, isDeleting ? deleteSpeed : typingSpeed);
    }
    
    type();
    
    // Scroll Animation with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    };
    
    // Function to handle elements becoming visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // If the element is a skill bar, calculate the level
                if (entry.target.classList.contains('skill__bar')) {
                    entry.target.style.setProperty('--level', entry.target.dataset.level + '%');
                }
            }
        });
    }, observerOptions);
    
    // Observe skill bars for animation
    document.querySelectorAll('.skill__bar').forEach(bar => {
        observer.observe(bar);
    });
    
    // Observe sections for fade-in animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Smooth Scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 50,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, anchor.getAttribute('href'));
                
                // Close menu if open
                if (menuOpen) {
                    menuBtn.classList.remove('open');
                    nav.classList.remove('open');
                    menuOpen = false;
                }
            }
        });
    });
    
    // Active navigation based on scroll position
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav__link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Parallax Effect for background elements
    function parallaxEffect() {
        const scrolled = window.pageYOffset;
        
        document.querySelectorAll('.parallax').forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
    
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    function toggleBackToTopButton() {
        if (document.documentElement.scrollTop > 300) {
            backToTopBtn.style.display = 'flex';
            
            // Add entrance animation
            setTimeout(() => {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.transform = 'translateY(0)';
            }, 50);
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.transform = 'translateY(20px)';
            
            // Remove button after fade out
            setTimeout(() => {
                backToTopBtn.style.display = 'none';
            }, 300);
        }
    }
    
    // Form submission handler
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Here you would normally process the form data
            // For now, just show a success message
            const formGroups = contactForm.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.style.display = 'none';
            });
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <h3>Message Sent!</h3>
                <p>Thank you for your message. I'll get back to you soon!</p>
            `;
            
            contactForm.appendChild(successMessage);
            
            // Reset form after 5 seconds
            setTimeout(() => {
                contactForm.reset();
                formGroups.forEach(group => {
                    group.style.display = 'block';
                });
                submitBtn.style.display = 'block';
                successMessage.remove();
            }, 5000);
        });
    }
    
    // Event listeners for scroll events
    window.addEventListener('scroll', () => {
        updateActiveNav();
        parallaxEffect();
        toggleBackToTopButton();
    });
    
    // Initialize back to top button state
    toggleBackToTopButton();
});

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}