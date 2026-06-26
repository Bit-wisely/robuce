// Toast notification engine
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (toast) {
        document.getElementById('toast-message').innerText = msg;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 4000);
    }
}

// Global wind physics parameters
let mouseX = -1000;
let mouseY = -1000;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // 3D Parallax Wrap
    const bgParallax = document.getElementById('bg-parallax-wrap');
    if (bgParallax) {
        const x = (window.innerWidth / 2 - e.clientX) / 45;
        const y = (window.innerHeight / 2 - e.clientY) / 45;
        bgParallax.style.transform = `scale(1.06) translate(${x}px, ${y}px)`;
    }
});

// Neon Leaves Engine
const leafContainer = document.getElementById('leaf-container');
const leafArray = [];
const maxLeaves = 30;

class NeonLeaf {
    constructor() {
        this.reset();
    }

    update() {
        this.y += this.vy;
        this.x += this.vx + Math.sin(this.windPhase) * 0.8;
        this.windPhase += this.windSpeed;
        
        this.angleX += this.vAngleX;
        this.angleY += this.vAngleY;
        this.angleZ += this.vAngleZ;

        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 180) {
            const force = (180 - dist) / 12;
            const angleRad = Math.atan2(dy, dx);
            this.x += Math.cos(angleRad) * force;
            this.y += Math.sin(angleRad) * force;
        }

        this.element.style.transform = `translate3d(${this.x}px, ${this.y}px, ${this.z}px) rotateX(${this.angleX}deg) rotateY(${this.angleY}deg) rotateZ(${this.angleZ}deg) scale(${this.scale})`;

        if (this.y > window.innerHeight + 100 || this.x < -100 || this.x > window.innerWidth + 100) {
            this.reset();
        }
    }

    reset() {
        if (!this.element && leafContainer) {
            this.element = document.createElement('div');
            this.element.className = 'leaf';
            leafContainer.appendChild(this.element);
        }
        
        if (this.element) {
            this.size = Math.random() * 12 + 6;
            this.element.style.width = this.size + 'px';
            this.element.style.height = (this.size * 1.3) + 'px';
            
            this.x = Math.random() * window.innerWidth;
            this.y = -50 - (Math.random() * 200);
            this.z = (Math.random() * 200) - 100;
            this.scale = Math.random() * 0.8 + 0.4;
            
            this.vx = (Math.random() * 1.2) - 0.4;
            this.vy = Math.random() * 1.2 + 0.8;
            
            this.angleX = Math.random() * 360;
            this.angleY = Math.random() * 360;
            this.angleZ = Math.random() * 360;
            this.vAngleX = (Math.random() * 2) - 1;
            this.vAngleY = (Math.random() * 2) - 1;
            this.vAngleZ = (Math.random() * 1.5) - 0.75;
            
            this.windPhase = Math.random() * Math.PI * 2;
            this.windSpeed = Math.random() * 0.04 + 0.01;
        }
    }
}

function initLeaves() {
    if (leafContainer) {
        for (let i = 0; i < maxLeaves; i++) {
            leafArray.push(new NeonLeaf());
        }

        function animate() {
            leafArray.forEach(leaf => leaf.update());
            requestAnimationFrame(animate);
        }
        animate();
    }
}

// 3D Flying Birds Engine
const birdContainer = document.getElementById('bird-container');
const birdArray = [];
const maxBirds = 6;

class FlyingBird {
    constructor() {
        this.reset();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        this.zPhase += this.zSpeed;
        const zOffset = Math.sin(this.zPhase) * 1.5;

        this.element.style.transform = `translate3d(${this.x}px, ${this.y + zOffset}px, 0) scale(${this.scale})`;
        
        if (this.vx > 0 && this.x > window.innerWidth + 100) {
            this.reset();
        } else if (this.vx < 0 && this.x < -100) {
            this.reset();
        }
    }

    reset() {
        if (!this.element && birdContainer) {
            this.element = document.createElement('div');
            this.element.className = 'bird';
            this.element.innerHTML = `
                <svg viewBox="0 0 30 30" class="w-full h-full">
                    <path class="body" d="M15 12 L17 24 L13 24 Z" fill="currentColor"/>
                    <path class="wing-left" d="M15 12 L3 4 L15 15 Z" fill="currentColor"/>
                    <path class="wing-right" d="M15 12 L27 4 L15 15 Z" fill="currentColor"/>
                </svg>
            `;
            birdContainer.appendChild(this.element);
        }
        
        if (this.element) {
            this.scale = Math.random() * 0.7 + 0.3;
            this.element.style.width = (30 * this.scale) + 'px';
            this.element.style.height = (30 * this.scale) + 'px';
            
            if (Math.random() > 0.5) {
                this.element.style.color = `rgba(255, 75, 139, ${0.4 + this.scale * 0.5})`;
            } else {
                this.element.style.color = `rgba(255, 107, 53, ${0.4 + this.scale * 0.5})`;
            }

            if (Math.random() > 0.5) {
                this.x = -50;
                this.vx = Math.random() * 1.5 + 0.75;
                this.element.style.transform = 'scaleX(1)';
            } else {
                this.x = window.innerWidth + 50;
                this.vx = -(Math.random() * 1.5 + 0.75);
                this.element.style.transform = 'scaleX(-1)';
            }
            this.y = Math.random() * (window.innerHeight * 0.6);
            this.vy = (Math.random() * 0.6) - 0.3;
            
            this.zPhase = Math.random() * Math.PI * 2;
            this.zSpeed = Math.random() * 0.05 + 0.02;
            
            const flapDur = 0.25 + (Math.random() * 0.25);
            const wl = this.element.querySelector('.wing-left');
            const wr = this.element.querySelector('.wing-right');
            if (wl && wr) {
                wl.style.animation = `flap-left ${flapDur}s ease-in-out infinite alternate`;
                wr.style.animation = `flap-right ${flapDur}s ease-in-out infinite alternate`;
            }
        }
    }
}

function initBirds() {
    if (birdContainer) {
        for (let i = 0; i < maxBirds; i++) {
            birdArray.push(new FlyingBird());
        }

        function animate() {
            birdArray.forEach(bird => bird.update());
            requestAnimationFrame(animate);
        }
        animate();
    }
}

// Mobile Navbar Drawer Toggle Logic
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
const menuBackdrop = document.getElementById('menu-backdrop');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        const isActive = mobileMenu.classList.contains('active');
        if (!isActive) {
            mobileMenu.classList.add('active');
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark text-xl"></i>';
            if (menuBackdrop) menuBackdrop.classList.add('active-dim');
        } else {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
            if (menuBackdrop) menuBackdrop.classList.remove('active-dim');
        }
    });

    mobileNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
            if (menuBackdrop) menuBackdrop.classList.remove('active-dim');
        });
    });

    if (menuBackdrop) {
        menuBackdrop.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars text-xl"></i>';
            menuBackdrop.classList.remove('active-dim');
        });
    }
}

// Automatically highlight navbar based on page pathname
function highlightCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop() || 'index.html';
    
    const navBtns = document.querySelectorAll('.nav-btn');
    const mobBtns = document.querySelectorAll('.mobile-nav-btn');
    
    navBtns.forEach(btn => {
        const href = btn.getAttribute('href');
        if (href === page || (page === 'index.html' && href.includes('index.html'))) {
            btn.classList.add('active', 'text-white');
            btn.classList.remove('text-slate-300');
        } else {
            btn.classList.remove('active', 'text-white');
            btn.classList.add('text-slate-300');
        }
    });

    mobBtns.forEach(btn => {
        const href = btn.getAttribute('href');
        if (href === page || (page === 'index.html' && href.includes('index.html'))) {
            btn.classList.add('text-white', 'text-brand-orange');
            btn.classList.remove('text-slate-300');
        } else {
            btn.classList.remove('text-white', 'text-brand-orange');
            btn.classList.add('text-slate-300');
        }
    });
}


// Initialize Logic
window.addEventListener('DOMContentLoaded', () => {
    initLeaves();
    initBirds();
    highlightCurrentPage();
});
