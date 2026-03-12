// ==========================================
// 1. DOM ELEMENTS SELECTION
// ==========================================
const board = document.querySelector('.board');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');
const gameOverCard = document.getElementById('game-over-card');
const gameOverTitle = document.getElementById('game-over-title');
const gameOverMsg = document.getElementById('game-over-msg');
const finalScore = document.getElementById('final-score');
const finalHighScore = document.getElementById('final-high-score');
const restartBtn = document.getElementById('restart-btn');
const levelUpCard = document.getElementById('level-up-card');
const currentLevelElement = document.getElementById('current-level');
const timeElement = document.getElementById('time');
const startCard = document.getElementById('start-card');
const startBtn = document.getElementById('start-btn');

// ==========================================
// 2. AUDIO FILES
// ==========================================
const eatSound = new Audio('./Sounds/eat.mp3');
const deadSound = new Audio('./Sounds/dead.mp3');
const startSound = new Audio('./Sounds/start.mp3');
const levelUpSound = new Audio('./Sounds/levelup.mp3');
const bgMusic = new Audio('./Sounds/bgm.mp3');
bgMusic.loop = true;

// ==========================================
// 3. GAME STATE VARIABLES (Organized)
// ==========================================
let score = 0;
let level = 1;
let highScore = localStorage.getItem('snakeHighScore') || 0;
highScoreElement.innerText = highScore;
let isGameStarted = false;

const blockHeight = 50;
const blockWidth = 50;
const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

// 🔴 THE ULTIMATE FIX: Flexbox hata kar CSS Grid lagao aur exact columns define karo
board.style.display = 'grid';
board.style.gridTemplateColumns = `repeat(${cols}, ${blockWidth}px)`;
board.style.gridTemplateRows = `repeat(${rows}, ${blockHeight}px)`;

// Board ko sikud kar exact grid ke size par lock kardo (Extra space khatam!)
board.style.width = 'max-content';
board.style.height = 'max-content';
board.style.flexGrow = '0';

// 🚀 OPTIMIZED: Array ki jagah Object use kiya kyunki hum string keys ('row-col') use kar rahe hain
const blocks = {};
const snake = [{ x: 3, y: 2 }];

let dx = 0;
let dy = 1;
let food = { x: 5, y: 5 };

let seconds = 0;
let minutes = 0;
let timerLoop;
let isGameOver = false;

let gameSpeed = 200; // Speed variable ko top par le aaye
let gameLoop;

// ==========================================
// 4. BOARD SETUP (Optimized)
// ==========================================
// 🚀 OPTIMIZED: DocumentFragment ka use karke DOM reflows ko kam kiya (Fast Loading)
const fragment = document.createDocumentFragment();
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement('div');
        block.classList.add('block');
        // block.innerText = `${row}-${col}`; // Ise uncomment kar sakte ho debugging ke liye
        blocks[`${row}-${col}`] = block;
        fragment.appendChild(block);
    }
}
board.appendChild(fragment); // Saare blocks ek hi baar mein add ho gaye!

// ==========================================
// 5. GAME FUNCTIONS
// ==========================================

function updateTime() {
    seconds++;
    if (seconds === 60) {
        minutes++;
        seconds = 0;
    }
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    timeElement.innerText = `${m}-${s}`;
}

function generateFood() {
    let newX, newY;
    let onSnake = true;
    while (onSnake) {
        newX = Math.floor(Math.random() * rows);
        newY = Math.floor(Math.random() * cols);
        onSnake = snake.some(segment => segment.x === newX && segment.y === newY);
    }
    food = { x: newX, y: newY };
}

// 🚀 OPTIMIZED: Ab yeh poore 400 blocks clear nahi karta. 
// Sirf unhi blocks ko clear karta hai jahan current snake tha.
function clearBoard() {
    snake.forEach(segment => {
        const block = blocks[`${segment.x}-${segment.y}`];
        if (block) {
            block.style.backgroundColor = '';
            block.classList.remove('fill');
        }
    });
}

function render() {
    // Pehle Khane ko draw karo
    const foodBlock = blocks[`${food.x}-${food.y}`];
    if (foodBlock) {
        foodBlock.style.backgroundColor = 'rgb(223, 118, 12)';
    }

    // Snake draw karo
    snake.forEach((segment, index) => {
        const block = blocks[`${segment.x}-${segment.y}`];
        if (block) {
            if (index == 0) {
                block.style.backgroundColor = 'red';
            } else {
                block.classList.add('fill');
            }
        }
    });
}

function move() {
    // 🚀 OPTIMIZED: Naya logic run karne se pehle purane snake ko mita do
    clearBoard();

    const head = snake[0];
    const newHead = { x: head.x + dx, y: head.y + dy };

    // Wall Collision Check
    if (newHead.x < 0 || newHead.x >= rows || newHead.y < 0 || newHead.y >= cols) {
        gameOver("Tum deewar se takra gaye 💥");
        return;
    }

    // Self-Collision Check
    if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        gameOver("Tum khud se takra gaye 🐍");
        return;
    }

    snake.unshift(newHead); // Naya Sir add karo

    // Khaane ka check
    if (newHead.x === food.x && newHead.y === food.y) {
        generateFood();
        // 🔴 OPTIMIZED: Audio Promise Rejection Fix
        eatSound.play().catch(e => console.log("Audio waiting for interaction"));

        score += 10;
        scoreElement.innerText = score;

        // Level Up Logic
        if (score % 50 === 0 && score !== 0) {
            level++;
            currentLevelElement.innerText = level;
            // 🔴 OPTIMIZED: Audio Promise Rejection Fix
            levelUpSound.play().catch(e => console.log("Audio waiting for interaction"));

            levelUpCard.classList.remove('hidden');
            setTimeout(() => { levelUpCard.classList.add('hidden'); }, 2000);

            // 🚀 BUG FIX: Speed badhane wala logic jo delete ho gaya tha
            if (gameSpeed > 50) { // Limit set ki taaki impossible na ho jaye
                gameSpeed -= 10;
                clearInterval(gameLoop);
                gameLoop = setInterval(move, gameSpeed);
            }
        }
    } else {
        snake.pop(); // Khaana nahi khaya toh poonch kaato
    }

    render(); // Board par nayi state draw karo
}

function gameOver(message) {
    bgMusic.pause();
    // 🔴 OPTIMIZED: Audio Promise Rejection Fix
    deadSound.play().catch(e => console.log("Audio waiting for interaction"));
    isGameOver = true;

    clearInterval(gameLoop);
    clearInterval(timerLoop);

    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreElement.innerText = highScore;
        gameOverTitle.innerText = "🎉 NAYA HIGH SCORE! 🎉";
        gameOverTitle.style.color = "#FFD700";
    } else {
        gameOverTitle.innerText = "Game Over!";
        gameOverTitle.style.color = "#ff4c4c";
    }

    gameOverMsg.innerText = message;
    finalScore.innerText = score;
    finalHighScore.innerText = highScore;
    gameOverCard.classList.remove('hidden');
}

function restartGame() {
    level = 1;
    score = 0;
    seconds = 0;
    minutes = 0;
    dx = 0;
    dy = 1;
    gameSpeed = 200; // Speed wapas normal
    isGameOver = false;

    scoreElement.innerText = score;
    timeElement.innerText = "00-00";

    levelUpCard.classList.add('hidden');
    gameOverCard.classList.add('hidden');

    // 🔴 OPTIMIZED: Audio Promise Rejection Fix
    startSound.play().catch(e => console.log("Audio waiting for interaction"));
    bgMusic.currentTime = 0;
    // 🔴 OPTIMIZED: Audio Promise Rejection Fix
    bgMusic.play().catch(e => console.log("Audio waiting for interaction"));

    // Board aur Snake reset
    clearBoard();
    snake.length = 0;
    snake.push({ x: 3, y: 2 });

    // Purana khana mitao aur naya banao
    const oldFood = blocks[`${food.x}-${food.y}`];
    if (oldFood) oldFood.style.backgroundColor = '';
    generateFood();

    clearInterval(gameLoop);
    clearInterval(timerLoop);
    gameLoop = setInterval(move, gameSpeed);
    timerLoop = setInterval(updateTime, 1000);
}

// ==========================================
// 6. EVENT LISTENERS & INITIALIZATION
// ==========================================

function initGame() {
    startCard.classList.add('hidden');
    isGameStarted = true;
    restartGame();
}

startBtn.addEventListener('click', initGame);

restartBtn.addEventListener('click', () => {
    if (isGameOver) restartGame();
});

document.addEventListener('keydown', (event) => {
    // Start game from the home screen using Enter
    if (!isGameStarted && event.key === 'Enter') {
        initGame();
        return;
    }

    // Restart game from Game Over screen using Enter
    if (isGameStarted && isGameOver && event.key === 'Enter') {
        restartGame();
        return;
    }

    // Prevent movement if game hasn't started or is over
    if (!isGameStarted || isGameOver) return;

    if (bgMusic.paused) bgMusic.play().catch(e => console.log("Audio waiting"));

    // Movement controls
    if (event.key === 'ArrowUp' && dx !== 1) { dx = -1; dy = 0; }
    else if (event.key === 'ArrowDown' && dx !== -1) { dx = 1; dy = 0; }
    else if (event.key === 'ArrowLeft' && dy !== 1) { dx = 0; dy = -1; }
    else if (event.key === 'ArrowRight' && dy !== -1) { dx = 0; dy = 1; }
});


// ==========================================
// 📱 MOBILE TOUCH CONTROLS (SWIPE DETECTION)
// ==========================================

let touchStartX = 0;
let touchStartY = 0;

// 1. Capture where the finger first touches the screen
document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: false });

// 2. Prevent the screen from scrolling/refreshing while swiping
document.addEventListener('touchmove', (e) => {
    if (isGameStarted && !isGameOver) {
        e.preventDefault();
    }
}, { passive: false });

// 3. Capture where the finger leaves the screen and calculate the swipe
document.addEventListener('touchend', (e) => {
    if (!isGameStarted || isGameOver) return;

    let touchEndX = e.changedTouches[0].screenX;
    let touchEndY = e.changedTouches[0].screenY;

    handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
});

function handleSwipe(startX, startY, endX, endY) {
    let diffX = endX - startX;
    let diffY = endY - startY;

    // If the swipe is too small (just a tap), ignore it
    if (Math.abs(diffX) < 30 && Math.abs(diffY) < 30) return;

    // Start background music if it's paused
    if (bgMusic.paused) bgMusic.play().catch(e => console.log("Audio waiting"));

    // Check if the swipe was mostly horizontal or mostly vertical
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal Swipe
        if (diffX > 0 && dy !== -1) {
            dx = 0; dy = 1; // Swipe Right
        } else if (diffX < 0 && dy !== 1) {
            dx = 0; dy = -1; // Swipe Left
        }
    } else {
        // Vertical Swipe
        if (diffY > 0 && dx !== -1) {
            dx = 1; dy = 0; // Swipe Down
        } else if (diffY < 0 && dx !== 1) {
            dx = -1; dy = 0; // Swipe Up
        }
    }
}


// Render the initial background state (but don't start the timers!)
generateFood();
render();