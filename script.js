const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let bird = {
    x: 50,
    y: canvas.height / 2,
    width: 30,
    height: 30,
    gravity: 0.5,
    lift: -10,
    velocity: 0,
};

let pipes = [];
let frame = 0;
let score = 0;
let gameOver = false;

function drawBird() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);
}

function drawPipes() {
    ctx.fillStyle = 'green';
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipe.width, pipe.top);
        ctx.fillRect(pipe.x, canvas.height - pipe.bottom, pipe.width, pipe.bottom);
    });
}

function updatePipes() {
    if (frame % 100 === 0) {
        const top = Math.random() * (canvas.height / 2);
        const bottom = Math.random() * (canvas.height / 2);
        pipes.push({
            x: canvas.width,
            width: 50,
            top: top,
            bottom: bottom,
        });
    }

    pipes.forEach(pipe => {
        pipe.x -= 2;
    });

    if (pipes.length && pipes[0].x < -50) {
        pipes.shift();
        score++;
    }
}

function checkCollision() {
    for (let pipe of pipes) {
        if (
            bird.x < pipe.x + pipe.width &&
            bird.x + bird.width > pipe.x &&
            (bird.y < pipe.top || bird.y + bird.height > canvas.height - pipe.bottom)
        ) {
            gameOver = true;
        }
    }

    if (bird.y + bird.height >= canvas.height || bird.y < 0) {
        gameOver = true;
    }
}

function resetGame() {
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    gameOver = false;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!gameOver) {
        bird.velocity += bird.gravity;
        bird.y += bird.velocity;

        drawBird();
        drawPipes();
        updatePipes();
        checkCollision();

        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, 10, 20);
    } else {
        ctx.fillStyle = 'red';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
        ctx.font = '20px Arial';
        ctx.fillText('Press R to Restart', canvas.width / 2 - 100, canvas.height / 2 + 30);
    }

    frame++;
    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !gameOver) {
        bird.velocity += bird.lift;
    }
    if (e.code === 'KeyR' && gameOver) {
        resetGame();
    }
});

gameLoop(); ### Step 4: Adding Event Listeners for User Interaction

To make the game more interactive, you can add event listeners for mouse clicks as well. Update the `script.js` file with the following code:

```javascript
window.addEventListener('click', () => {
    if (!gameOver) {
        bird.velocity += bird.lift;
    } else {
        resetGame();
    }
});
