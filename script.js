// Переключение экранов
const welcome = document.getElementById('welcome-screen');
const profile = document.getElementById('profile-screen');
const enterText = document.querySelector('.enter-text');

function showProfile() {
  welcome.classList.add('fade-out');
  setTimeout(() => {
    welcome.classList.add('hidden');
    profile.classList.add('visible');
    profile.classList.remove('hidden');
    // Запуск анимации звёзд
    resizeCanvas();
    createStars();
    animate();
    // Воспроизведение аудио
    const bgAudio = document.getElementById('bg-audio');
    if (bgAudio) {
      bgAudio.currentTime = 94; // 1:34 в секундах
      bgAudio.volume = 0.3;
      bgAudio.play().catch(() => {});
    }
  }, 700); // Время совпадает с transition в CSS
}

welcome.addEventListener('click', showProfile);
if (enterText) enterText.addEventListener('click', showProfile);

// Анимация звёзд
const canvas = document.getElementById('stars-bg');
const ctx = canvas.getContext('2d');
let stars = [];
const STAR_COUNT = 40;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 1,
      alpha: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.2 + 0.05
    });
  }
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const star of stars) {
    ctx.save();
    ctx.globalAlpha = star.alpha;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
    // Движение звёзд
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }
}

function animate() {
  drawStars();
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createStars();
});

// --- Управление фоновой музыкой ---
window.addEventListener('DOMContentLoaded', () => {
  const bgAudio = document.getElementById('bg-audio');
  const bgSlider = document.getElementById('bg-volume-slider');
  const bgIcon = document.getElementById('bg-volume-icon');
  if (!bgAudio || !bgSlider || !bgIcon) return;

  // Начальное состояние
  bgAudio.volume = 0.3;
  bgSlider.value = 0.3;
  updateBgIcon();

  bgSlider.addEventListener('input', () => {
    bgAudio.volume = bgSlider.value;
    if (bgAudio.volume === 0) {
      bgAudio.muted = true;
    } else {
      bgAudio.muted = false;
    }
    updateBgIcon();
  });

  bgIcon.addEventListener('click', () => {
    bgAudio.muted = !bgAudio.muted;
    updateBgIcon();
    if (bgAudio.muted) {
      bgSlider.value = 0;
    } else {
      bgSlider.value = bgAudio.volume || 0.3;
    }
  });

  function updateBgIcon() {
    if (bgAudio.muted || bgAudio.volume == 0) {
      bgIcon.classList.add('muted');
    } else {
      bgIcon.classList.remove('muted');
    }
  }
});

// --- Счётчик посещений через countapi.xyz ---
window.addEventListener('DOMContentLoaded', () => {
  fetch('https://api.countapi.xyz/hit/dnkz9-bio/visits')
    .then(res => res.json())
    .then(data => {
      const countElem = document.querySelector('.views .count');
      if (countElem) {
        if (data.value < 436) {
          fetch('https://api.countapi.xyz/set/dnkz9-bio/visits?value=436')
            .then(res2 => res2.json())
            .then(data2 => {
              countElem.textContent = data2.value;
            });
        } else {
          countElem.textContent = data.value;
        }
      }
    });
}); 