let gameStarted = false;
let movementDisplay;
let ctx;
let game;
let cactus;
let enemy;

const pressStart = document.querySelector('#press-start');

function Crawler(x, y, width, height, color) {// color will become sprite
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.alive = true;
    this.render = function () { // constructor function
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const startGame = (event) => {
    console.log(event);
    console.log('game started!')
    gameStarted = true;
    pressStart.style.display = 'none';
}

const movementHandler = (event) => {
    
    console.log('the game has started');
}

const gravityHandler = (event) => {
    console.log('key up');
}

// main event listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('dom content loaded');
    document.addEventListener('keydown', startGame);
    document.addEventListener('keyup', gravityHandler);
    
});

// first time user presses space, it starts the game