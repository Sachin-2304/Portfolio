// Three.js Background
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize Typed.js
    if (typeof Typed !== 'undefined') {
        new Typed('.typed-text', {
            strings: ['AI Engineer', 'Robotics Developer', 'Creative Technologist', 'Future Builder'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            alert('Message sent successfully!');
            contactForm.reset();
        });
    }
    
    // Initialize Three.js background
    initThreeJsBackground();
    
    // Add animated background lines
    createBackgroundLines();
    
    // Initialize skill bars animation
    animateSkillBars();
});

// Three.js background animation
function initThreeJsBackground() {
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        // Load Three.js dynamically
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = setupThreeJsScene;
        document.head.appendChild(script);
    } else {
        setupThreeJsScene();
    }
}

function setupThreeJsScene() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Add grid
    const gridHelper = new THREE.GridHelper(200, 50, 0x00ffff, 0xff00ff);
    scene.add(gridHelper);
    
    // Add particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Camera position
    camera.position.z = 30;
    camera.position.y = 10;
    camera.rotation.x = -0.3;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.y += 0.001;
        gridHelper.rotation.y += 0.001;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Mouse movement parallax effect
    document.addEventListener('mousemove', (event) => {
        const mouseX = (event.clientX / window.innerWidth) - 0.5;
        const mouseY = (event.clientY / window.innerHeight) - 0.5;
        
        particlesMesh.rotation.x = mouseY * 0.1;
        particlesMesh.rotation.y = mouseX * 0.1;
    });
}

// Create animated background lines
function createBackgroundLines() {
    const container = document.createElement('div');
    container.className = 'bg-lines';
    document.body.appendChild(container);
    
    for (let i = 0; i < 20; i++) {
        const line = document.createElement('div');
        line.className = 'bg-line';
        line.style.left = `${Math.random() * 100}%`;
        line.style.animationDuration = `${Math.random() * 5 + 5}s`;
        line.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(line);
    }
}

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        const skill = bar.getAttribute('data-skill');
        
        // Create the skill name element
        const skillName = document.createElement('div');
        skillName.className = 'absolute left-3 top-0 h-full flex items-center text-white z-10';
        skillName.textContent = skill;
        
        // Create the progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'h-full bg-gradient-to-r from-cyan-500 to-purple-500 absolute left-0 top-0';
        progressBar.style.width = '0%';
        
        // Add elements to the skill bar
        bar.appendChild(skillName);
        bar.appendChild(progressBar);
        
        // Animate the progress bar when in viewport
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        progressBar.style.width = level;
                        progressBar.style.transition = 'width 1.5s ease-out';
                    }, 300);
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
}

// Add cyberpunk glitch effect to elements with class 'glitch-text'
function addGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
        if (!element.getAttribute('data-text')) {
            element.setAttribute('data-text', element.textContent);
        }
    });
}

// Add neon effect to headings
function addNeonEffect() {
    const headings = document.querySelectorAll('h1, h2, h3');
    
    headings.forEach(heading => {
        if (heading.classList.contains('text-cyan-400')) {
            heading.classList.add('neon-text');
        } else if (heading.classList.contains('text-purple-500')) {
            heading.classList.add('neon-text-purple');
        }
    });
}

// Initialize effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    addGlitchEffect();
    addNeonEffect();
    
    // Add gradient border to selected elements
    document.querySelectorAll('.project-card, .border-cyan-500, .border-purple-500').forEach(element => {
        element.classList.add('gradient-border');
    });
    
    // Add floating animation to selected elements
    document.querySelectorAll('.project-card img, .glitch-container').forEach(element => {
        element.classList.add('float-animation');
    });
});
