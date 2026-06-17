// ============================================
// 1. АНИМАЦИЯ ЦИФР В СТАТИСТИКЕ
// ============================================
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // 2 секунды
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * target);
            stat.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                stat.textContent = target + '+';
            }
        }
        
        requestAnimationFrame(updateNumber);
    });
}

// Запускаем анимацию при загрузке
window.addEventListener('load', animateNumbers);

// ============================================
// 2. КОПИРОВАНИЕ КОДА
// ============================================
const copyBtn = document.getElementById('copyCodeBtn');
const codeBlock = document.getElementById('luaCodeBlock');

if (copyBtn && codeBlock) {
    copyBtn.addEventListener('click', function() {
        const codeText = codeBlock.textContent;
        
        navigator.clipboard.writeText(codeText).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = '✅ Скопировано!';
            copyBtn.style.background = '#2a5f3a';
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.background = '#1f2f60';
            }, 2000);
        }).catch(() => {
            // Fallback для старых браузеров
            const textarea = document.createElement('textarea');
            textarea.value = codeText;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            
            copyBtn.textContent = '✅ Скопировано!';
            setTimeout(() => {
                copyBtn.textContent = '📋 Копировать код';
            }, 2000);
        });
    });
}

// ============================================
// 3. СМЕНА ТЕМЫ ФОНА
// ============================================
const themeBtn = document.getElementById('themeToggle');
let themeIndex = 0;
const themes = [
    'linear-gradient(145deg, #0b0e2a 0%, #1b0f3a 45%, #0f1f4a 100%)',
    'linear-gradient(145deg, #0a0a2a 0%, #2a0a3a 50%, #0a1a5a 100%)',
    'linear-gradient(145deg, #1a0a2a 0%, #0a1a4a 40%, #2a0a4a 100%)',
    'linear-gradient(145deg, #050a1a 0%, #1a0a3a 50%, #0a2a4a 100%)'
];

if (themeBtn) {
    themeBtn.addEventListener('click', function() {
        themeIndex = (themeIndex + 1) % themes.length;
        document.body.style.background = themes[themeIndex];
        
        // Небольшая обратная связь
        themeBtn.textContent = '✨ Смена ' + (themeIndex + 1) + '/' + themes.length;
        setTimeout(() => {
            themeBtn.textContent = '✨ Сменить фон';
        }, 1500);
    });
}

// ============================================
// 4. КНОПКА "НАЧАТЬ ИГРУ"
// ============================================
const playBtn = document.getElementById('playBtn');
if (playBtn) {
    playBtn.addEventListener('click', function() {
        // Эффект нажатия
        playBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            playBtn.style.transform = 'scale(1)';
        }, 150);
        
        // Показываем уведомление
        const message = document.createElement('div');
        message.textContent = '🎮 Добро пожаловать в Roblox!';
        message.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(30, 50, 120, 0.95);
            backdrop-filter: blur(10px);
            padding: 1rem 2.5rem;
            border-radius: 60px;
            border: 2px solid #7f9eff;
            color: #fff;
            font-size: 1.2rem;
            font-weight: 600;
            box-shadow: 0 0 50px rgba(100, 70, 255, 0.5);
            z-index: 9999;
            animation: slideDown 0.5s ease;
        `;
        
        // Добавляем стили анимации если их нет
        if (!document.getElementById('notificationStyles')) {
            const style = document.createElement('style');
            style.id = 'notificationStyles';
            style.textContent = `
                @keyframes slideDown {
                    from { opacity: 0; transform: translateX(-50%) translateY(-30px); }
                    to { opacity: 1; transform: translateX(-50%) translateY(0); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.opacity = '0';
            message.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 3000);
    });
}

// ============================================
// 5. КНОПКА "ПОКАЗАТЬ КОД"
// ============================================
const codeBtn = document.getElementById('codeBtn');
if (codeBtn) {
    codeBtn.addEventListener('click', function() {
        const codeSection = document.getElementById('code');
        if (codeSection) {
            codeSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Подсветка блока кода
            const wrapper = codeSection.querySelector('.code-wrapper');
            if (wrapper) {
                wrapper.style.transition = 'box-shadow 0.3s ease';
                wrapper.style.boxShadow = '0 0 60px rgba(120, 90, 255, 0.5), 0 0 120px rgba(80, 70, 255, 0.2)';
                setTimeout(() => {
                    wrapper.style.boxShadow = '0 0 40px rgba(80, 70, 255, 0.1)';
                }, 2000);
            }
        }
    });
}

// ============================================
// 6. КНОПКА "ПРИСОЕДИНИТЬСЯ"
// ============================================
const communityBtn = document.getElementById('communityBtn');
if (communityBtn) {
    communityBtn.addEventListener('click', function() {
        communityBtn.textContent = '✅ Готово!';
        communityBtn.style.background = '#2a7a4a';
        communityBtn.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            communityBtn.textContent = 'Присоединиться';
            communityBtn.style.background = '#4f7aff';
            communityBtn.style.transform = 'scale(1)';
        }, 2000);
        
        // Уведомление
        alert('🌐 Добро пожаловать в сообщество Roblox!');
    });
}

// ============================================
// 7. ПЛАВНАЯ ПРОКРУТКА ДЛЯ НАВИГАЦИИ
// ============================================
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// 8. ЭФФЕКТ ПОЯВЛЕНИЯ КАРТОЧЕК ПРИ СКРОЛЛЕ
// ============================================
const cards = document.querySelectorAll('.feature-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

console.log('🚀 Modern Roblox сайт загружен!');
console.log('💻 HTML, CSS и JavaScript разделены.');
