const gameContainer = document.getElementById('gameContainer');
const levelDisplay = document.getElementById('level');
const enemyCountDisplay = document.getElementById('enemyCount');

let player = {x: 50, y: 50, speed: 10};
let enemies = [];
let level = 1;
let enemyCount = 5;

// Create player element
const playerEl = document.createElement('div');
playerEl.classList.add('player');
gameContainer.appendChild(playerEl);

// Initialize enemies
function spawnEnemies(count) {
  enemies = [];
  gameContainer.querySelectorAll('.enemy').forEach(e => e.remove());
  for (let i = 0; i < count; i++) {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.left = Math.random() * (window.innerWidth - 30) + 'px';
    enemy.style.top = Math.random() * (window.innerHeight - 30) + 'px';
    gameContainer.appendChild(enemy);
    enemies.push(enemy);
  }
  enemyCountDisplay.textContent = enemies.length;
}

// Move player
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') player.y -= player.speed;
  if (e.key === 'ArrowDown') player.y += player.speed;
  if (e.key === 'ArrowLeft') player.x -= player.speed;
  if (e.key === 'ArrowRight') player.x += player.speed;

  // Boundaries
  player.x = Math.max(0, Math.min(window.innerWidth - 40, player.x));
  player.y = Math.max(0, Math.min(window.innerHeight - 40, player.y));

  playerEl.style.left = player.x + 'px';
  playerEl.style.top = player.y + 'px';
});

// Collision detection
function checkCollisions() {
  enemies.forEach((enemy, index) => {
    const ex = parseFloat(enemy.style.left);
    const ey = parseFloat(enemy.style.top);
    const dx = ex - player.x;
    const dy = ey - player.y;
    if (Math.sqrt(dx*dx + dy*dy) < 40) {
      enemy.remove();
      enemies.splice(index, 1);
      enemyCountDisplay.textContent = enemies.length;
    }
  });

  // Next level
  if (enemies.length === 0) {
    level++;
    levelDisplay.textContent = level;
    enemyCount += 3; // Increase enemies per level
    spawnEnemies(enemyCount);
  }
}

// Game loop
function gameLoop() {
  checkCollisions();
  requestAnimationFrame(gameLoop);
}

// Restart game
function restartGame() {
  level = 1;
  enemyCount = 5;
  levelDisplay.textContent = level;
  spawnEnemies(enemyCount);
}

// Start
spawnEnemies(enemyCount);
gameLoop();
