// const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');
const themeMusic = new Audio('./assets/sounds/three-red-hearts-quiet.wav');
const goCactus = new Audio('./assets/sounds/go-cactus.wav');
const jumpSound = new Audio('./assets/sounds/jump.wav');
const collisionSound = new Audio('./assets/sounds/explode.wav')
let gameStarted;
let gameMessage;
let canvas;
let ctx;
let cactus;
let enemy;
let jumping = false; 

class Character {
    constructor(x, y, height, width, color){
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.color = color;
        this.alive = true;
        this.render = function () {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
        this.stopRender = function () {
            ctx.clearRect(this.x, this.y, this.width, this.height);
        }
    }
};

let x = 320;
let xScrollRate = 4;

const animate = () => {
    if (gameStarted) {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        cactus.render();
        enemy = new Character(x, 100, 32, 32, '#000000'); // randomizer will go here
        enemy.render();
        x -= xScrollRate; // move
        if (collisionCheck()) {
            console.log('collision');
            collisionSound.play();
            // cancelAnimationFrame(animate);
            setTimeout(cactus.stopRender(), 5000)
            xScrollRate = 0;
            endGame();
            
        };
}
};

const keypressHandler = (e) => {
    console.log(e);    
    switch(e.keyCode) {
        case (13):
        if (!gameStarted) { // start the game  
            playAgain();
            break;
        } else if (gameStarted && !jumping) { 
            jump();
            gravityHandler();
            break;
        }    
        default: 
            console.log('wrong key');
    }
};

const jump = () => {
    jumping = true; // use jumping = true to prevent double jump
    jumpSound.play(); 
    cactus.y -= 40;
}

const gravityHandler = () => {
    console.log('gravity');
    setTimeout(() => { // cactus gravity!! 
        while (cactus.y != 100) {
            jumping = false;
            cactus.y += 5
        }}, 300);
}


const collisionCheck = () => {
    if (cactus.x + cactus.width > enemy.x &&
        cactus.x < enemy.x + enemy.width &&
        cactus.y + cactus.height > enemy.y &&
        cactus.y < enemy.y + enemy.height) {
            // console.log('collision detected successfully!');
            enemy.stopRender();
            return true;
        }
};

const endGame = () => {
    gameStarted = false;
    gameMessage.style.display = 'block';
    gameMessage.textContent = 'CACTUS, NO!'
    console.log('game should end now')
    themeMusic.pause();
    themeMusic.currentTime = 0;
};

const playAgain = () => {
    gameMessage.style.display = 'none';
    goCactus.play();
    themeMusic.play();
    gameStarted = true;
    animate();
}

// main event listeners
document.addEventListener('DOMContentLoaded', () => {
    // DOM REFERENCE
    canvas = document.querySelector('canvas');
    gameMessage = document.querySelector('#game-message');
    // CANVAS CONFIGURATION
    canvas.innerHeight = 320;
    canvas.innerWidth = 480;
    ctx = canvas.getContext('2d');

    // CHARACTER REFERENCES
    cactus = new Character(60, 100, 32, 32, '#006400');

    gameStarted = false;

    document.addEventListener('keydown', keypressHandler);
});

// TODO character class constructor
// TODO jump function 
// TODO gravity function 


// let movementDisplay;
// let game;
// let cactus;
// let enemy;

// const ctx = document.getElementById('game-space').getContext('2d');

// const pressStart = document.querySelector('#press-start');


// function Crawler(x, y, width, height, color) {// color will become sprite
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
//     this.color = color;
//     this.alive = true;
//     this.render = function () { // constructor function
//         ctx.fillStyle = this.color;
//         ctx.fillRect(this.x, this.y, this.width, this.height);
//     }
// }

// const startGame = (event) => {
//     if (!gameStarted) {
//         console.log('GAME START')
//         pressStart.style.display = 'none';
//         gameStarted = true;
//     } else {
//         movementHandler();
//     }
// }

// const movementHandler = (event) => {
//     console.log('the game has started');
// }

// const gravityHandler = (event) => {
//     console.log('key up');
// }

// main event listeners
// document.addEventListener('DOMContentLoaded', () => {
//     console.log('dom content loaded');
//     document.addEventListener('keydown', startGame);
//     document.addEventListener('keyup', gravityHandler);
// });


// ctx.fillStyle = 'rgba(0, 0, 0, 1)';
// ctx. fillRect(200, 112, 32, 16);

// BASIC SQUARE RANDOMIZER LOGIC
// the enemies aren't random on screen
// only generated randomly off screen
// for (let i = 0; i < 3; i++) {
//     let x = Math.random() * (canvas.innerWidth*2);
//     let y = 100;
//     ctx.fillStyle = 'rgba(0, 0, 0, 1)';
//     ctx.fillRect(x, y, 32, 32);

// }