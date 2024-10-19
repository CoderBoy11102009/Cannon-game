const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const cannonBaseImg = new Image();
const cannonImg = new Image();
const cannonballImg = new Image();

cannonBaseImg.src = './assets/cannonBase.png';
cannonImg.src = './assets/canon.png';
cannonballImg.src = './assets/cannonball.png';

const cannonWidth = 100;
const cannonHeight = 20;
const cannonY = canvas.height - cannonHeight - 10;
const cannonSpeed = 0.1; // Speed of rotation
let cannonAngle = 0; // Angle in radians
let bullets = [];

document.addEventListener('keydown', (event) => {
    // Rotate cannon with arrow keys
    if (event.key === 'ArrowLeft') {
        cannonAngle -= cannonSpeed; // Rotate left
    }
    if (event.key === 'ArrowRight') {
        cannonAngle += cannonSpeed; // Rotate right
    }
    // Fire bullet
    if (event.key === ' ') {
        bullets.push({
            x: canvas.width / 2,
            y: cannonY,
            angle: cannonAngle
        });
    }
});

function updateBullets() {
    bullets = bullets.filter(bullet => bullet.y > 0);
    bullets.forEach(bullet => {
        bullet.x += Math.cos(bullet.angle) * 5; // Move bullet in the direction of the angle
        bullet.y -= Math.sin(bullet.angle) * 5; // Move bullet upwards
    });
}

function drawCannonBase() {
    ctx.drawImage(cannonBaseImg, canvas.width / 2 - cannonWidth / 2, cannonY + 10, cannonWidth, cannonHeight);
}

function drawCannon() {
    ctx.save();
    ctx.translate(canvas.width / 2, cannonY + 10); // Move to the base center
    ctx.rotate(cannonAngle); // Rotate the cannon
    ctx.drawImage(cannonImg, -cannonWidth / 2, -cannonHeight, cannonWidth, cannonHeight); // Draw cannon
    ctx.restore();
}

function drawBullets() {
    bullets.forEach(bullet => {
        ctx.drawImage(cannonballImg, bullet.x, bullet.y, 5, 10);
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCannonBase(); // Draw the cannon base
    updateBullets();
    drawCannon();
    drawBullets();
    requestAnimationFrame(gameLoop);
}

// Check if images load successfully
cannonBaseImg.onload = () => {
    console.log('Cannon base loaded');
    cannonImg.onload = () => {
        console.log('Cannon loaded');
        cannonballImg.onload = () => {
            console.log('Cannonball loaded');
            gameLoop();
        };
    };
};

// Log errors if images fail to load
cannonBaseImg.onerror = () => console.error('Failed to load cannonBase.png');
cannonImg.onerror = () => console.error('Failed to load canon.png');
cannonballImg.onerror = () => console.error('Failed to load cannonball.png');

// Debugging: Draw placeholders if images don't load
cannonBaseImg.onerror = () => {
    console.log('Using placeholder for cannon base');
    ctx.fillStyle = 'brown';
    ctx.fillRect(canvas.width / 2 - cannonWidth / 2, cannonY + 10, cannonWidth, cannonHeight);
};

cannonImg.onerror = () => {
    console.log('Using placeholder for cannon');
    ctx.fillStyle = 'gray';
    ctx.fillRect(canvas.width / 2 - 10, cannonY - 30, 20, 60); // Placeholder for the cannon
};

cannonballImg.onerror = () => {
    console.log('Using placeholder for cannonball');
};
