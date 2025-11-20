// ========================================
// KOSAKA GAMES - WITH SOUND EFFECTS
// ========================================

let currentLang = 'id';

// ========================================
// SOUND SYSTEM
// ========================================
const SoundEffects = {
    playClick: function() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    },
    
    playHover: function() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 600;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.05);
    },
    
    playSuccess: function() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 1000;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
        
        setTimeout(() => {
            const osc2 = audioContext.createOscillator();
            const gain2 = audioContext.createGain();
            
            osc2.connect(gain2);
            gain2.connect(audioContext.destination);
            
            osc2.frequency.value = 1200;
            osc2.type = 'sine';
            
            gain2.gain.setValueAtTime(0.3, audioContext.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            
            osc2.start(audioContext.currentTime);
            osc2.stop(audioContext.currentTime + 0.2);
        }, 100);
    }
};


// ========================================
// NAVIGATION
// ========================================
function showSection(sectionName) {
    SoundEffects.playClick();
    
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === sectionName) {
            btn.classList.add('active');
        }
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchTab(tabName) {
    SoundEffects.playClick();
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const targetContent = document.getElementById(tabName);
    if (targetContent) {
        targetContent.classList.add('active');
    }
    
    document.querySelectorAll('.lib-tab').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });
}

// ========================================
// GAME BUTTONS
// ========================================
function initGameButtons() {
    document.querySelectorAll('.pokemon-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            SoundEffects.playSuccess();
            
            const gameUrl = this.getAttribute('data-game');
            if (gameUrl) {
                setTimeout(() => {
                    window.location.href = gameUrl;
                }, 300);
            } else {
                alert('Game belum tersedia!');
            }
        });
    });
}

// ========================================
// CONTACT FORM HANDLER
// ========================================
function initContactForm() {
    const form = document.getElementById('suggestionForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            SoundEffects.playSuccess();
            
            const formData = {
                name: document.getElementById('userName').value,
                email: document.getElementById('userEmail').value,
                suggestion: document.getElementById('userSuggestion').value
            };
            
            showSuccessMessage();
            form.reset();
            
            console.log('Form submitted:', formData);
        });
    }
}

function showSuccessMessage() {
    let successMsg = document.querySelector('.success-message');
    
    if (!successMsg) {
        successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        const form = document.getElementById('suggestionForm');
        form.parentNode.insertBefore(successMsg, form.nextSibling);
    }
    
    successMsg.textContent = translate('successMessage');
    successMsg.classList.add('show');
    
    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 5000);
}

// ========================================
// HOVER EFFECTS WITH SOUND
// ========================================
function initHoverSounds() {
    document.querySelectorAll('.pokemon-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            SoundEffects.playHover();
        });
    });
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            SoundEffects.playHover();
        });
    });
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            SoundEffects.playHover();
        });
    });
    
    document.querySelectorAll('.lib-tab').forEach(tab => {
        tab.addEventListener('mouseenter', () => {
            SoundEffects.playHover();
        });
    });
}

// ========================================
// EVENT LISTENERS
// ========================================
function initEventListeners() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showSection(btn.dataset.section);
        });
    });
    
    document.querySelectorAll('.lib-tab').forEach(btn => {
        btn.addEventListener('click', () => {
            switchTab(btn.dataset.tab);
        });
    });
    
    const backBtn = document.querySelector('.back-to-home');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            showSection('home');
        });
        
        backBtn.addEventListener('mouseenter', () => {
            SoundEffects.playHover();
        });
    }
}

// ========================================
// PARTICLES ANIMATION
// ========================================
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    document.body.insertBefore(particlesContainer, document.body.firstChild);
    
    for (let i = 0; i < 30; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    
    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 50%;
        left: ${startX}px;
        bottom: -10px;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        animation: floatUp ${duration}s ${delay}s infinite ease-in-out;
    `;
    
    container.appendChild(particle);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// INITIALIZE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    initGameButtons();
    initHoverSounds();
    createFloatingParticles();
    initContactForm();
    
    console.log('🎮 KOSAKA GAMES loaded!');
    console.log('🔊 Sound effects: ENABLED');
    console.log('✨ Animations: ENABLED');
    console.log('📧 Contact form: READY');
    console.log('🇮🇩 Indonesian flag: DISPLAYED');
});

window.showSection = showSection;