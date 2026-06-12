// Three.js Setup for Abstract 3D Background
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050505, 0.002);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Geometry - Torus Knot for abstract, complex feeling
const geometry = new THREE.TorusKnotGeometry(10, 3, 300, 20);

// Material - Wireframe glowing material
const material = new THREE.MeshStandardMaterial({
    color: 0x444444,
    wireframe: true,
    roughness: 0.1,
    metalness: 0.9
});

const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Lighting to create the gradient effect
const pointLight1 = new THREE.PointLight(0xff6b2b, 2, 100); // Orange
pointLight1.position.set(20, 20, 10);

const pointLight2 = new THREE.PointLight(0x9d33d6, 2, 100); // Purple
pointLight2.position.set(-20, -20, 10);

const pointLight3 = new THREE.PointLight(0xfacc15, 1, 100); // Yellow
pointLight3.position.set(0, 0, 20);

scene.add(pointLight1, pointLight2, pointLight3);

// Ambient light for base visibility
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Mouse interaction
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Scroll interaction for the mockup
const mockup = document.querySelector('.mockup-container');
window.addEventListener('scroll', () => {
    if(mockup) {
        const scrolled = window.scrollY;
        // Subtle parallax/tilt effect on scroll
        const rotateX = Math.max(0, 5 - scrolled * 0.01);
        mockup.style.transform = `rotateX(${rotateX}deg) rotateY(0deg) translateZ(0)`;
    }
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate Torus Knot
    torusKnot.rotation.x += 0.001;
    torusKnot.rotation.y += 0.002;
    torusKnot.rotation.z += 0.001;

    // Interactive mouse rotation (smooth ease)
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;
    
    torusKnot.rotation.y += 0.05 * (targetX - torusKnot.rotation.y);
    torusKnot.rotation.x += 0.05 * (targetY - torusKnot.rotation.x);

    // Dynamic light pulsing
    const time = Date.now() * 0.001;
    pointLight1.position.x = Math.sin(time * 0.7) * 30;
    pointLight1.position.y = Math.cos(time * 0.5) * 40;
    
    pointLight2.position.x = Math.cos(time * 0.3) * 30;
    pointLight2.position.y = Math.sin(time * 0.5) * 40;

    renderer.render(scene, camera);
}

animate();

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ==========================================
// PREMIUM MICROINTERACTIONS & SCROLL REVEALS
// ==========================================

// 1. Auto-add reveal class to elements for scroll animation
const revealElements = document.querySelectorAll('.section-title, .feature-card, .glass-panel, .code-window, .table-responsive, .glass-card, .faq-item, .cta-box, .stat-item, .mockup-container');
revealElements.forEach((el) => {
    el.classList.add('reveal');
});

// 2. Intersection Observer for Scroll Reveal
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Reveal only once
        }
    });
}, observerOptions);

revealElements.forEach(el => observer.observe(el));

// 3. Spotlight Hover Effect (Premium Glassmorphism)
const cards = document.querySelectorAll('.glass-card, .feature-card, .faq-item, .glass-panel');
cards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});
