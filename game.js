const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score-value');
const startGameBtn = document.getElementById('start-game');
const instructions = document.getElementById('instructions');

// Initialize game variables
let score = 0;
let gameSpeed = 5;
let isGameOver = false;

// Function to move player left or right
function movePlayer(direction) {
    const playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
    if (direction === 'left' && playerLeft > 0) {
        player.style.left = `${playerLeft - 10}px`;
    } else if (direction === 'right' && playerLeft < gameContainer.clientWidth - player.clientWidth) {
        player.style.left = `${playerLeft + 10}px`;
    }
}

// Function to create and move obstacles
function createObstacle() {
    if (!isGameOver) {
        const obstacle = document.createElement('div');
        obstacle.classList.add('obstacle');
        obstacle.style.left = `${Math.random() * (gameContainer.clientWidth - 20)}px`;
        gameContainer.appendChild(obstacle);

        // Move the obstacle downward
        let obstacleInterval = setInterval(() => {
            if (!isGameOver) {
                const obstacleTop = parseInt(window.getComputedStyle(obstacle).getPropertyValue('top'));
                obstacle.style.top = `${obstacleTop + gameSpeed}px`;

                // Check for collision with player
                if (checkCollision(obstacle)) {
                    gameOver();
                }

                // Remove obstacle if it goes below the game container
                if (obstacleTop > gameContainer.clientHeight) {
                    gameContainer.removeChild(obstacle);
                    score++;
                    scoreElement.textContent = score;
                    clearInterval(obstacleInterval);
                }
            }
        }, 20);
    }
}

// Function to check collision with player
function checkCollision(obstacle) {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    return !(playerRect.right < obstacleRect.left || 
             playerRect.left > obstacleRect.right || 
             playerRect.bottom < obstacleRect.top || 
             playerRect.top > obstacleRect.bottom);
}

// Function to handle game over
function gameOver() {
    isGameOver = true;
    alert(`Game over! Your score is ${score}`);
    setTimeout(() => {
        location.reload();
    }, 3000);
}

// Event listener for "Start Game" button
startGameBtn.addEventListener('click', () => {
    // Show instructions
    instructions.style.display = 'block';
    // Start the game loop
    setInterval(createObstacle, 300);
});

// Event listeners for keyboard controls
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        movePlayer('left');
    } else if (event.key === 'ArrowRight') {
        movePlayer('right');
    }
});