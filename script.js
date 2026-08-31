const worldEl = document.getElementById('world');
const playerContainer = document.getElementById('player-container');
const playerEmoji = document.getElementById('player-emoji');

const sunEl = document.getElementById('sun');
const mtnBack = document.getElementById('mountains-back');
const mtnFront = document.getElementById('mountains-front');
const depthText1 = document.getElementById('depth-text-1');
const depthText2 = document.getElementById('depth-text-2');
const hillsEl = document.getElementById('hills');

const sections = document.querySelectorAll('.section-card');

let playerX = 100; 
let cameraX = 0; 
let targetCameraX = 0;

const speed = 14;
const maxWorldWidth = 12200;

const keys = { right: false, left: false };

window.addEventListener('keydown', (e) => {
  if(e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') keys.right = true;
  if(e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') keys.left = true;
});

window.addEventListener('keyup', (e) => {
  if(e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') keys.right = false;
  if(e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') keys.left = false;
});

const bindTouch = (id, key) => {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener('touchstart', (e) => { e.preventDefault(); keys[key] = true; });
    btn.addEventListener('touchend', (e) => { e.preventDefault(); keys[key] = false; });
  }
};
bindTouch('btn-right', 'right'); 
bindTouch('btn-left', 'left');

function gameLoop() {
  let isMoving = false;

  if (keys.right && playerX < maxWorldWidth) {
    playerX += speed;
    isMoving = true;
    playerContainer.style.setProperty('--facing', '-1'); 
  } else if (keys.left && playerX > 50) {
    playerX -= speed;
    isMoving = true;
    playerContainer.style.setProperty('--facing', '1'); 
  }

  if (isMoving) {
    playerEmoji.innerText = '🚶‍♂️';
    if (!playerContainer.classList.contains('is-walking')) {
      playerContainer.classList.add('is-walking');
    }
  } else {
    playerEmoji.innerText = '🧍‍♂️';
    playerContainer.classList.remove('is-walking');
  }

  const screenW = window.innerWidth;
  const centerOffset = screenW * 0.35;

  if (playerX > centerOffset) {
    targetCameraX = playerX - centerOffset;
  } else {
    targetCameraX = 0;
  }

  cameraX += (targetCameraX - cameraX) * 0.08;

  worldEl.style.transform = `translate3d(${-cameraX}px, 0, 0)`;
  playerContainer.style.left = `${playerX}px`;

  sunEl.style.transform = `translate3d(${-cameraX * 0.02}px, 0, 0)`;
  mtnBack.style.transform = `translate3d(${-cameraX * 0.15}px, 0, 0)`;
  
  depthText1.style.transform = `translate3d(${-cameraX * 0.25}px, 0, 0)`;
  depthText2.style.transform = `translate3d(${-cameraX * 0.25}px, 0, 0)`;
  
  mtnFront.style.transform = `translate3d(${-cameraX * 0.35}px, 0, 0)`;
  hillsEl.style.transform = `translate3d(${-cameraX * 0.75}px, 0, 0)`;

  sections.forEach(sec => {
    const secX = parseInt(sec.getAttribute('data-x'));
    if (playerX > secX - (screenW * 0.65) && playerX < secX + 700) {
      sec.classList.add('visible');
    } else {
      sec.classList.remove('visible');
    }
  });

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);