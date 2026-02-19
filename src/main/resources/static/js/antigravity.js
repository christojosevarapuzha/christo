/**
 * Antigravity Particle Animation
 * Only active when 'dark' class is present on body.
 */

const canvas = document.createElement('canvas');
canvas.id = 'antigravity-canvas';
document.body.prepend(canvas);

const ctx = canvas.getContext('2d');
let particles = [];
let animationFrameId;

// Configuration
const PARTICLE_COUNT = 100;
const PARTICLE_COLOR = '#E5C06A'; // Gold
const LINK_DISTANCE = 150;
const MOUSE_DISTANCE = 200;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; // Slow horizontal
        this.vy = (Math.random() - 0.5) * 0.5 - 0.2; // Slight upward drift (antigravity)
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_DISTANCE) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (MOUSE_DISTANCE - distance) / MOUSE_DISTANCE;
            const directionX = forceDirectionX * force * this.size;
            const directionY = forceDirectionY * force * this.size;

            this.x -= directionX;
            this.y -= directionY;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 192, 106, ${this.opacity})`;
        ctx.fill();
    }
}

const mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('resize', () => {
    resizeCanvas();
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    // Check if dark mode is active
    if (!document.body.classList.contains('dark')) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'none';

        // Check again in a bit, or rely on toggle observer. 
        // For simplicity, we keep loop running but do nothing, or we can pause.
        // Let's just pause and restart on mutation observer.
        // return; 
    } else {
        canvas.style.display = 'block';
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Draw connections
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < LINK_DISTANCE) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(229, 192, 106, ${0.1 * (1 - distance / LINK_DISTANCE)})`;
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    animationFrameId = requestAnimationFrame(animate);
}

// Observe body for class changes to handle start/stop efficiently
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            checkTheme();
        }
    });
});

function checkTheme() {
    if (document.body.classList.contains('dark')) {
        if (canvas.style.display === 'none') {
            canvas.style.display = 'block';
            // Re-init if needed or just let loop continue
        }
    } else {
        canvas.style.display = 'none';
    }
}

observer.observe(document.body, { attributes: true });

// Initial setup
resizeCanvas();
initParticles();
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';
canvas.style.display = 'none'; // Default hidden until checked

checkTheme(); // Initial check
animate();
