document.addEventListener('DOMContentLoaded', () => {
    // Existing GitHub arrow click handler
    const githubArrow = document.getElementById('github-arrow-link');
    if (githubArrow) {
        githubArrow.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://github.com/KavyaSiddharthan', '_blank');
        });
    }

    const weatherGithub = document.getElementById('weather-github');
    if (weatherGithub) {
        weatherGithub.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Coming soon!');
            // Hide the description text after clicking
            const projectCard = weatherGithub.closest('.project-card');
            if (projectCard) {
                const description = projectCard.querySelector('.project-info p');
                if (description) {
                    description.style.display = 'none';
                }
            }
        });
    }

    const contactMeBtn = document.getElementById('contact-me-btn');
    const contactSection = document.getElementById('contact');
    if (contactMeBtn && contactSection) {
        contactMeBtn.addEventListener('click', () => {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Toggle welcome text on click
    const welcomeText = document.getElementById('welcome-text');
    if (welcomeText) {
        welcomeText.addEventListener('click', () => {
            if (welcomeText.textContent === 'WELCOME!') {
                welcomeText.textContent = 'THANK YOU!';
            } else {
                welcomeText.textContent = 'WELCOME!';
            }
        });
    }

    // Footer show/hide on scroll
    const footer = document.querySelector('footer');
    function checkFooterVisibility() {
        if (!footer) return;
        const showThreshold = 200; // px from top to start showing footer
        if (window.scrollY > showThreshold) {
            footer.style.display = 'block';
        } else {
            footer.style.display = 'none';
        }
    }
    window.addEventListener('scroll', checkFooterVisibility);
    // Initial check
    checkFooterVisibility();
});

// Loading screen functionality - Simplified and unified
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.getElementById('loading-text');
    const mainContent = document.getElementById('main-content');

    if (!loadingScreen || !loadingText || !mainContent) {
        console.error('Loading screen elements not found');
        return;
    }

    const messages = [
        'INITIALIZING SYSTEM...',
        'COMPILING SKILLS...',
        'DEPLOYING AI ASSISTANT...',
        'LOADING PORTFOLIO...',
        'SYSTEM READY!'
    ];

    let currentIndex = 0;
    let isLoading = true;

    console.log('Loading screen started');

    function showNextMessage() {
        if (currentIndex < messages.length) {
            console.log('Showing message:', messages[currentIndex]);
            loadingText.textContent = messages[currentIndex];
            currentIndex++;

            if (currentIndex < messages.length) {
                setTimeout(showNextMessage, 800);
            } else {
                setTimeout(finishLoading, 800);
            }
        }
    }

    function finishLoading() {
        console.log('Finishing loading screen');
        isLoading = false;
        loadingScreen.style.display = 'none';
        mainContent.style.display = 'block';
        mainContent.classList.add('loaded');

        initInteractiveFeatures();
        console.log('Loading complete');
    }

    // Start the loading sequence
    showNextMessage();

    // Fallback timeout
    setTimeout(() => {
        if (isLoading) {
            console.log('Fallback: Force finishing loading');
            finishLoading();
        }
    }, 8000);
}

window.addEventListener('load', () => {
    initLoadingScreen();
});

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener('click', () => {
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenuButton.setAttribute('aria-expanded', String(!isExpanded));
    mobileMenu.classList.toggle('hidden');
  });
}

// Download JSON functionality
const downloadJsonBtn = document.getElementById('download-json-btn');

if (downloadJsonBtn) {
  downloadJsonBtn.addEventListener('click', () => {
    const portfolioData = {
      // Personal Information (5 fields)
      name: "Kavya S",
      email: "kavya.s@example.com",
      phone: "+91-9876543210",
      location: "Chennai, Tamil Nadu, India",
      linkedin: "https://www.linkedin.com/in/kavya-siddharthan",

      // Professional Summary (2 fields)
      title: "Full Stack Developer",
      summary: "Passionate about creativity, technology, and problem-solving. Skilled in Java, Flutter/Dart, SQL, HTML5, CSS3, and design.",

      // Skills (8 fields)
      technicalSkills: ["Java", "Flutter/Dart", "HTML5", "CSS3", "JavaScript", "React", "SQL", "Git"],
      softSkills: ["Problem Solving", "Team Collaboration", "UI/UX Design", "Project Management"],
      proficiencyLevels: {
        Java: "Expert",
        "Flutter/Dart": "Advanced",
        HTML5: "Expert",
        CSS3: "Expert",
        JavaScript: "Advanced",
        React: "Advanced",
        SQL: "Intermediate",
        Git: "Advanced"
      },

      // Education (4 fields)
      education: [
        {
          degree: "B.E. Computer Science Engineering",
          institution: "Arasu Engineering College",
          location: "Kumbakonam, Tamil Nadu",
          year: "2021-2025",
          cgpa: "8.0/10"
        },
        {
          degree: "HSC",
          institution: "Srinivasa Matric Hr. Sec. School",
          location: "Chennai, Tamil Nadu",
          year: "2020-2021",
          percentage: "69%"
        },
        {
          degree: "SSLC",
          institution: "Williams Matriculation School",
          location: "Chennai, Tamil Nadu",
          year: "2018-2019",
          percentage: "91%"
        }
      ],

      // Work Experience (3 fields)
      experience: [
        {
          position: "Full Stack Developer",
          company: "Maksasoft Pvt. Ltd.",
          location: "Chennai, Tamil Nadu",
          duration: "2024-Present",
          description: "Designed, developed, and deployed full-stack applications integrating frontend and backend technologies. Collaborated within an agile team to ensure timely delivery and code quality."
        }
      ],

      // Projects (6 fields)
      projects: [
        {
          name: "Intelligent Intrusion Detection System",
          description: "Developed a machine learning-based IDS to monitor network traffic and detect intrusions effectively.",
          technologies: ["Python", "Machine Learning", "Network Security"],
          github: "https://github.com/KavyaSiddharthan/an-intelligent-ids-using-ml-algorithms.git",
          linkedin: "https://www.linkedin.com/in/KavyaSiddharthan",
          type: "Academic Project"
        },
        {
          name: "Medical Chatbot (MedBot)",
          description: "Created a Java-based chatbot using basic NLP to deliver accurate health information.",
          technologies: ["Java", "NLP", "Healthcare"],
          github: "https://github.com/KavyaSiddharthan/medical_chatbot-medbot-.git",
          linkedin: "https://www.linkedin.com/in/KavyaSiddharthan",
          type: "Academic Project"
        },
        {
          name: "Weather Forecast App",
          description: "Built a responsive weather forecast app using HTML, CSS, JavaScript, and OpenWeatherMap API.",
          technologies: ["HTML5", "CSS3", "JavaScript", "API Integration"],
          github: "#",
          linkedin: "https://www.linkedin.com/in/KavyaSiddharthan",
          type: "Academic Project"
        },
        {
          name: "Personal Portfolio",
          description: "Created a personal portfolio website using HTML5, CSS3, and JavaScript to showcase skills and projects.",
          technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
          github: "#",
          linkedin: "https://www.linkedin.com/in/KavyaSiddharthan",
          type: "Personal Project"
        }
      ],

      // Certifications (5 fields)
      certifications: [
        {
          name: "Java Full Stack Development Training",
          issuer: "JSpiders",
          location: "Velachery, Chennai",
          duration: "2024-2025",
          type: "Training Program"
        },
        {
          name: "TITAN Leap – Employability Skills Program",
          issuer: "TITAN",
          year: "2024",
          type: "Skill Development"
        },
        {
          name: "National Conference – Recent Trends in Computing",
          issuer: "Arasu Engineering College",
          year: "2024",
          type: "Conference"
        },
        {
          name: "Innovative Technologies Workshop",
          issuer: "AVC College of Engineering",
          year: "2023",
          type: "Workshop"
        }
      ],

      // Languages (2 fields)
      languages: [
        { language: "Tamil", proficiency: "Native" },
        { language: "English", proficiency: "Fluent" }
      ],

      // Additional Information (3 fields)
      interests: ["Technology", "Design", "Problem Solving", "Creative Coding"],
      achievements: ["CGPA: 8.0/10 in Engineering", "91% in SSLC", "Active in technical conferences"],
      lastUpdated: new Date().toISOString()
    };

    // Convert to JSON string
    const jsonString = JSON.stringify(portfolioData, null, 2);

    // Create blob and download
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'kavya-portfolio-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  });
}

 // Hero animations: fade-in, glitch, 3D avatar shatter/reassemble
 function initHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.classList.add('glitch');
        setTimeout(() => heroTitle.classList.remove('glitch'), 3000);
    }
    // TODO: Add 3D avatar shatter and reassemble animation here
 }
 // Cursor trail effect
 function initCursorTrail() {
    const cursorTrail = document.getElementById('cursor-trail');
    if (!cursorTrail) return;
    document.addEventListener('mousemove', (e) => {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = `${e.pageX}px`;
        trail.style.top = `${e.pageY}px`;
        document.body.appendChild(trail);
        setTimeout(() => trail.remove(), 500);
    });
 }
 // Notes feature is integrated into the chatbot window in HTML
 function initNotesFeature() {
    // Notes functionality is handled by inline script in HTML
    return;
 }
 // Chatbot functionality is handled by inline script in HTML
 function initChatbot() {
    // Chatbot functionality is handled by inline script in HTML
    return;
 }
 function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.speed || '0.3');
            el.style.transform = `translateY(${scrollTop * speed}px)`;
        });
    });
 }
 // Contact form loading and notification
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;
    const submitButton = contactForm.querySelector('button[type="submit"]');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const message = formData.get('message').trim();

        // Client-side validation
        if (!name || !email || !message) {
            alert('Please fill in all fields: name, email, and message.');
            return;
        }
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        const data = { name, email, message };

        // Optimistic UI update: immediately update button text and disable
        if (submitButton) {
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
        }
        showLoading();
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (response.ok) {
                hideLoading();
                contactForm.reset();
                if (submitButton) {
                    submitButton.textContent = 'Message Sent';
                    submitButton.disabled = true;
                }
            } else {
                throw new Error(result.error || 'Form submission failed');
            }
        } catch (error) {
            hideLoading();
            if (submitButton) {
                submitButton.textContent = 'Message Not Sent';
                submitButton.disabled = false;
                // Optionally reset button after 3 seconds
                setTimeout(() => {
                    if (submitButton) {
                        submitButton.textContent = 'Send Message';
                        submitButton.disabled = false;
                    }
                }, 3000);
            }
        }
    });
}
function showLoading() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'form-loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <div class="loading-timer">0s</div>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
    // Start timer
    let seconds = 0;
    const timerElement = loadingOverlay.querySelector('.loading-timer');
    const timerInterval = setInterval(() => {
        seconds++;
        if (timerElement) timerElement.textContent = `${seconds}s`;
    }, 1000);
    // store interval id as a property (not dataset string)
    loadingOverlay._timerInterval = timerInterval;
 }
 function hideLoading() {
    const loadingOverlay = document.getElementById('form-loading-overlay');
    if (loadingOverlay) {
        if (loadingOverlay._timerInterval) {
            clearInterval(loadingOverlay._timerInterval);
        }
        loadingOverlay.remove();
    }
 }


 // Reveal animation for elements with 'reveal' class
 function initRevealAnimation() {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before fully in view
    });
    revealElements.forEach(el => observer.observe(el));
 }
 function initInteractiveFeatures() {
    initHeroAnimations();
    initCursorTrail();
    initNotesFeature();
    initChatbot();
    initParallax();
    initContactForm();
    initRevealAnimation();
 }
 // About Me Section JavaScript
 // Elements
 const nameBtn = document.getElementById('name-btn');
 const linkedinModal = document.getElementById('linkedin-modal');
 const linkedinCloseBtn = document.getElementById('linkedin-close-btn');
 const watchVideoBtn = document.getElementById('watch-video-btn');
 const videoPopup = document.getElementById('video-popup');
 const videoCloseBtn = document.getElementById('video-close-btn');
 const videoElement = videoPopup ? videoPopup.querySelector('video') : null;
 const cardsContainer = document.getElementById('cards-container');
 const prevBtn = document.getElementById('prev-btn');
 const nextBtn = document.getElementById('next-btn');
 const cards = cardsContainer ? Array.from(cardsContainer.querySelectorAll('.card')) : [];
 // Toggle LinkedIn modal
 function openLinkedinModal() {
    if (linkedinModal) {
        linkedinModal.classList.add('active');
        linkedinModal.classList.remove('hidden');
        if (nameBtn) nameBtn.setAttribute('aria-expanded', 'true');
        if (linkedinCloseBtn) linkedinCloseBtn.focus();
        document.body.style.overflow = 'hidden';
    }
 }
 function closeLinkedinModal() {
    if (linkedinModal) {
        linkedinModal.classList.remove('active');
        linkedinModal.classList.add('hidden');
        if (nameBtn) nameBtn.setAttribute('aria-expanded', 'false');
        if (nameBtn) nameBtn.focus();
        document.body.style.overflow = '';
    }
 }
 if (nameBtn) nameBtn.addEventListener('click', openLinkedinModal);
if (linkedinCloseBtn) linkedinCloseBtn.addEventListener('click', closeLinkedinModal);
 // Close LinkedIn modal on Escape key
 document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (linkedinModal && !linkedinModal.classList.contains('hidden')) {
            closeLinkedinModal();
        }
        if (videoPopup && !videoPopup.classList.contains('hidden')) {
            closeVideoPopup();
        }
    }
 });
 // Close LinkedIn modal if clicking outside content
 if (linkedinModal) {
    linkedinModal.addEventListener('click', (e) => {
        if (e.target === linkedinModal) {
            closeLinkedinModal();
        }
    });
 }
 // Video popup open/close
 function openVideoPopup() {
    if (videoPopup) {
        videoPopup.classList.remove('hidden');
        if (watchVideoBtn) watchVideoBtn.setAttribute('aria-expanded', 'true');
        if (videoCloseBtn) videoCloseBtn.focus();
        document.body.style.overflow = 'hidden';
    }
 }
 function closeVideoPopup() {
    if (videoPopup) {
        videoPopup.classList.add('hidden');
        if (watchVideoBtn) watchVideoBtn.setAttribute('aria-expanded', 'false');
        if (watchVideoBtn) watchVideoBtn.focus();
        document.body.style.overflow = '';
        if (videoElement) {
            videoElement.pause();
            videoElement.currentTime = 0;
        }
    }
 }
 if (watchVideoBtn) watchVideoBtn.addEventListener('click', openVideoPopup);
 if (videoCloseBtn) videoCloseBtn.addEventListener('click', closeVideoPopup);
 // Close video popup if clicking outside content
 if (videoPopup) {
    videoPopup.addEventListener('click', (e) => {
        if (e.target === videoPopup) {
            closeVideoPopup();
        }
    });
 }
 // Carousel logic
 let currentIndex = 0;
 function updateCards() {
    if (cards.length > 0) {
        cards.forEach((card, i) => {
            const pos = (i - currentIndex + cards.length) % cards.length;
            if (pos === 0) {
                card.style.zIndex = 3;
                card.style.transform = 'translate(-50%, -50%) scale(1) translateX(0) rotateY(0deg)';
                card.style.boxShadow = '0 0 20px #4deeeaaa';
                card.style.pointerEvents = 'auto';
                card.setAttribute('aria-hidden', 'false');
            } else if (pos === 1) {
                card.style.zIndex = 2;
                card.style.transform = 'translate(calc(-50% + 200px), -50%) scale(0.8) rotateY(-15deg)';
                card.style.boxShadow = '0 0 10px #4deeea88';
                card.style.pointerEvents = 'none';
                card.setAttribute('aria-hidden', 'true');
            } else if (pos === 2) {
                card.style.zIndex = 1;
               card.style.transform = 'translate(calc(-50% - 200px), -50%) scale(0.8) rotateY(15deg)';
                card.style.boxShadow = '0 0 10px #4deeea88';
                card.style.pointerEvents = 'none';
                card.setAttribute('aria-hidden', 'true');
            }
        });
    }
 }
 function showNext() {
    if (cards.length === 0) return;
    currentIndex = (currentIndex + 1) % cards.length;
    updateCards();
 }
 function showPrev() {
    if (cards.length === 0) return;
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCards();
 }
 if (nextBtn) nextBtn.addEventListener('click', showNext);
 if (prevBtn) prevBtn.addEventListener('click', showPrev);
 // Initialize
 updateCards();
 // Glittering cyberpunk background animation for projects section
 const canvas = document.getElementById('project-bg');
 if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    function resize() {
        width = canvas.width = canvas.clientWidth;
        height = canvas.height = canvas.clientHeight;
    }
    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.alpha = Math.random() * 0.8 + 0.2;
            this.color = `rgba(0, 255, 255, ${this.alpha})`;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
                this.reset();
            }
        }
        draw(ctx) {
            ctx.beginPath();
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 10;
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    function initParticles() {
        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }
    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw(ctx);
        });
        requestAnimationFrame(animate);
    }
    window.addEventListener('resize', () => {
        resize();
        initParticles();
    });
    resize();
    initParticles();
    animate();
 }
 let startX = 0;
 if (cardsContainer) {
    let isDragging = false;
    let lastSwipeTime = 0;
    cardsContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, {passive: true});
    cardsContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const now = Date.now();
        if (now - lastSwipeTime < 400) return; // cooldown to prevent spam
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        if (Math.abs(diff) > 50) {
            if (diff < 0) {
                showNext();
            } else {
                showPrev();
            }
            lastSwipeTime = now;
            isDragging = false;
        }
    }, {passive: true});
    cardsContainer.addEventListener('touchend', () => {
        isDragging = false;
    });
 }
 // Single DOMContentLoaded to initialize remaining features and modals
 document.addEventListener('DOMContentLoaded', () => {
    // Initialize interactive features
    initInteractiveFeatures();
    // Intro Audio Modal Functionality
    const introBtn = document.getElementById('intro-btn');
    const voicePopup = document.getElementById('voice-popup');
    const introAudio = document.getElementById('intro-audio');
    const closeVoicePopup = document.getElementById('close-voice-popup');
    const muteToggle = document.getElementById('mute-toggle');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const playIcon = document.getElementById('play-icon');
    if (introBtn && voicePopup && introAudio) {
        introBtn.addEventListener('click', () => {
            voicePopup.classList.remove('hidden');
            voicePopup.setAttribute('aria-hidden', 'false');
        });
    }
    if (closeVoicePopup && voicePopup && introAudio) {
        closeVoicePopup.addEventListener('click', () => {
            voicePopup.classList.add('hidden');
            voicePopup.setAttribute('aria-hidden', 'true');
            introAudio.pause();
            introAudio.currentTime = 0;
            if (playIcon) playIcon.className = 'fas fa-play';
        });
    }
    if (playPauseBtn && introAudio && playIcon) {
        playPauseBtn.addEventListener('click', () => {
            if (introAudio.paused) {
                introAudio.play().catch(e => console.log('Play prevented:', e));
                playIcon.className = 'fas fa-pause';
            } else {
                introAudio.pause();
                playIcon.className = 'fas fa-play';
            }
        });
    }
    if (muteToggle && introAudio) {
        const muteIcon = document.getElementById('mute-icon');
        muteToggle.addEventListener('click', () => {
            introAudio.muted = !introAudio.muted;
            if (muteIcon) {
                muteIcon.className = introAudio.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
            }
            muteToggle.setAttribute('aria-pressed', introAudio.muted.toString());
        });
    }
    // Close modal on Escape key for voicePopup (local handler)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && voicePopup && !voicePopup.classList.contains('hidden')) {
            voicePopup.classList.add('hidden');
            voicePopup.setAttribute('aria-hidden', 'true');
            if (introAudio) {
                introAudio.pause();
                introAudio.currentTime = 0;
            }
        }
    });
    // Close modal on outside click for voicePopup
    if (voicePopup) {
        voicePopup.addEventListener('click', (e) => {
            if (e.target === voicePopup) {
                voicePopup.classList.add('hidden');
                voicePopup.setAttribute('aria-hidden', 'true');
                if (introAudio) {
                    introAudio.pause();
                    introAudio.currentTime = 0;
                }
            }
        });
    }
    // Language Asteroids Functionality
    // Show asteroids only after scrolling to Skills section
    window.addEventListener("scroll", () => {
        const skills = document.getElementById("skills");
        const languageAsteroids = document.getElementById("language-asteroids");
        if (skills && languageAsteroids) {
            const rect = skills.getBoundingClientRect();
            if (rect.bottom < window.innerHeight && rect.bottom > 0) {
                languageAsteroids.style.display = "block";
            }
        }
    });
// Handle asteroid click events
const asteroids = document.querySelectorAll(".language-asteroid");
asteroids.forEach(asteroid => {
    asteroid.addEventListener("click", () => {
        if (asteroid.classList.contains("blasted")) return;
        // Create blast text
        const text = document.createElement("div");
        text.classList.add("language-blast-text");
        text.textContent = asteroid.getAttribute("data-lang");
        asteroid.appendChild(text);
        // Start blast after text appears
        setTimeout(() => {
            const lang = asteroid.getAttribute("data-lang");
            createBlastParticles(asteroid, lang);
            asteroid.classList.add("blasted");
            setTimeout(() => {
                asteroid.style.display = "none";
                // Set flag to hide all asteroids after refresh
                localStorage.setItem("asteroidsBlasted", "true");
            }, 1000);
        }, 1200); // wait until text shows
    });
});

function createBlastParticles(asteroid, lang) {
    // Play pop sound
    playPopSound(lang);

    const rect = asteroid.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement("div");
        particle.classList.add("blast-particle");
        const angle = (i / 20) * 2 * Math.PI;
        const distance = Math.random() * 100 + 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        particle.style.setProperty("--x", `${x}px`);
        particle.style.setProperty("--y", `${y}px`);
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

function playPopSound(lang) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        let startFreq = 800;
        let endFreq = 200;
        if (lang === "தமிழ்") {
            startFreq = 600; // Lower for Tamil
            endFreq = 150;
        } else if (lang === "English") {
            startFreq = 1000; // Higher for English
            endFreq = 250;
        }

        oscillator.frequency.setValueAtTime(startFreq, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(endFreq, audioContext.currentTime + 0.1);

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

// Check if asteroids have been blasted before
if (localStorage.getItem("asteroidsBlasted") === "true") {
    const languageAsteroids = document.getElementById("language-asteroids");
    if (languageAsteroids) {
        languageAsteroids.style.display = "none";
    }
}

    // Show success message for note submission
    function showNoteSuccessMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: #00ffff;
                        color: #000; padding: 15px 20px; border-radius: 8px;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.3); z-index: 10000;
                        font-weight: bold; max-width: 300px;">
                <i class="fas fa-check-circle" style="margin-right: 8px;"></i>
                Note sent successfully! Thank you! 
            </div>
        `;
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 4000);
    }
    // Show error message for note submission
    function showNoteErrorMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: #ff4444;
                        color: #fff; padding: 15px 20px; border-radius: 8px;
                        box-shadow: 0 4px 15px rgba(0,0,0,0.3); z-index: 10000;
                        font-weight: bold; max-width: 300px;">
                <i class="fas fa-exclamation-circle" style="margin-right: 8px;"></i>
                Failed to send note. Please try again.
            </div>
        `;
        document.body.appendChild(message);
        setTimeout(() => message.remove(), 4000);
    }
 // Notes Form Functionality
    const noteForm = document.getElementById('note-form');
    const sendNoteBtn = document.getElementById('send-note-btn');
    if (noteForm) {
        noteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(noteForm);
            const data = {
                note: formData.get('message'),
                sender: formData.get('name') + ' (' + formData.get('email') + ')'
            };
            // Show loading state and update button text
            if (sendNoteBtn) {
                sendNoteBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                sendNoteBtn.disabled = true;
            }
            try {
                const response = await fetch('/api/notes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                if (response.ok) {
                    showNoteSuccessMessage();
                    noteForm.reset();
                    if (sendNoteBtn) {
                        sendNoteBtn.textContent = 'Note Sent';
                        sendNoteBtn.disabled = true;
                    }
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        if (sendNoteBtn) {
                            sendNoteBtn.textContent = 'Send Note';
                            sendNoteBtn.disabled = false;
                        }
                    }, 3000);
                } else {
                    throw new Error(result.error || 'Failed to send note');
                }
            } catch (error) {
                console.error('Error sending note:', error);
                showNoteErrorMessage();
                if (sendNoteBtn) {
                    sendNoteBtn.textContent = 'Note Sent Failed';
                    sendNoteBtn.disabled = true;
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        if (sendNoteBtn) {
                            sendNoteBtn.textContent = 'Send Note';
                            sendNoteBtn.disabled = false;
                        }
                    }, 3000);
                }
            }
        });
    }
    // End of DOMContentLoaded
 });

// Website Like & Share functionality

// Connect to Socket.IO server
const socket = io({ transports: ['polling', 'websocket'] });

// Thank you popup function
function showThankYouPopup() {
  let popup = document.createElement('div');
  popup.innerHTML = '<span style="font-size:1.5em;vertical-align:middle;">♥</span> <span style="vertical-align:middle;">Thank you!</span>';
  popup.className = 'star-thankyou-popup blue-thankyou';
  document.body.appendChild(popup);
  setTimeout(() => {
    popup.style.opacity = '0';
    popup.style.transform = 'scale(0.7)';
  }, 900);
  setTimeout(() => popup.remove(), 1300);
}

let likes = 0;
const likeBtn = document.querySelector(".like-btn");
const likeCount = likeBtn ? likeBtn.querySelector(".like-count") : null;

// Listen for real-time like count updates
socket.on('likeCount', (count) => {
  likes = count;
  if (likeCount) {
    likeCount.innerText = likes;
  }
});

// Load initial like count from backend
async function loadLikeCount() {
  try {
    const response = await fetch('/api/likes');
    const data = await response.json();
    likes = data.likes;
    if (likeCount) {
      likeCount.innerText = likes;
    }
  } catch (error) {
    console.error('Error loading like count:', error);
    // Fallback to localStorage if backend fails
    likes = localStorage.getItem("websiteLikes") || 0;
    if (likeCount) {
      likeCount.innerText = likes;
    }
  }
}

async function toggleLike(button) {
  // Optimistic update: increment likes and update UI immediately
  likes++;
  if (likeCount) {
    likeCount.innerText = likes;
  }
  button.classList.add("liked");
  // Remove bottom margin/padding to avoid space after like
  button.style.marginBottom = '0';
  button.style.paddingBottom = '0';

  // Update heart icon color
  const heartIcon = button.querySelector('.fa-heart');
  if (heartIcon) {
    heartIcon.style.color = 'white';
  }

  // Show big heart animation like Instagram
  showBigHeartAnimation(button);

  try {
    const response = await fetch('/api/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    // Update with server response if different
    likes = data.likes;
    if (likeCount) {
      likeCount.innerText = likes;
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    // Revert optimistic update on error
    likes--;
    if (likeCount) {
      likeCount.innerText = likes;
    }
    button.classList.remove("liked");
    if (heartIcon) {
      heartIcon.style.color = '#e63946';
    }
    // Show error message
    const errorMessage = document.createElement('div');
    errorMessage.innerHTML = `
      <div style="position: fixed; top: 20px; right: 20px; background: #ff4444;
                  color: #fff; padding: 15px 20px; border-radius: 8px;
                  box-shadow: 0 4px 15px rgba(0,0,0,0.3); z-index: 10000;
                  font-weight: bold; max-width: 300px;">
        <i class="fas fa-exclamation-circle" style="margin-right: 8px;"></i>
        Failed to like. Please try again.
      </div>
    `;
    document.body.appendChild(errorMessage);
    setTimeout(() => errorMessage.remove(), 4000);
  }
}

// Load like count on page load
loadLikeCount();

function showBigHeartAnimation(button) {
  const heart = document.createElement('div');
  heart.className = 'big-heart-animation';
  heart.innerHTML = '<i class="fas fa-heart"></i>';
  document.body.appendChild(heart);

  // Position heart at center of button
  const rect = button.getBoundingClientRect();
  heart.style.left = `${rect.left + rect.width / 2}px`;
  heart.style.top = `${rect.top + rect.height / 2}px`;

  // Animate heart: float up like balloon and disappear
  heart.style.animation = 'heartBalloon 1.5s forwards ease-out';

  // Remove after animation
  heart.addEventListener('animationend', () => {
    heart.remove();
  });
}

function shareWebsite() {
  const url = "https://kavyasiddportfolio.onrender.com"; // your site link
  navigator.clipboard.writeText(url).then(() => {
    alert("Website link copied! 🎉");
  });
}
