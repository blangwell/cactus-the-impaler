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
let frameNo;
let x;
let xScrollRate = 4;

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


x = 320;
const animate = () => {
    xScrollRate = 4;
    let distance = Math.round(frameNo/50);
    console.log(distance);
    if (gameStarted) {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        frameNo++; // increment frameNo
        cactus.render(); 
        // this only creates one enemy. must refactor to generate randomly
        // new compo    nent? 
        enemy = new Character(x, 100, 32, 32, '#000000'); // randomizer will go here
        enemy.render();
        x -= xScrollRate; // move

        if (frameNo % 2 === 0 && enemy.x < -enemy.width){
            x = 320
            enemy = new Character(x, 100, 32, 32, '#000000')
            enemy.render();
        }

        if (collisionCheck()) {
            console.log('collision');
            collisionSound.play();
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
};

const gravityHandler = () => {
    console.log('gravity');
    setTimeout(() => { // cactus gravity!! 
        while (cactus.y != 100) {
            jumping = false;
            cactus.y += 5
        }}, 500);
};

const collisionCheck = () => {
    if (cactus.x + cactus.width > enemy.x &&
        cactus.x < enemy.x + enemy.width &&
        cactus.y + cactus.height > enemy.y &&
        cactus.y < enemy.y + enemy.height) {
            // console.log('collision detected successfully!');
            // enemy.stopRender();
            return true;
        }
};

const endGame = () => {
    gameStarted = false;
    gameMessage.style.display = 'block';
    gameMessage.textContent = 'CACTUS, NO!'
    // cactus.stopRender();
    console.log('game should end now')
    themeMusic.pause(); // stop music!
    themeMusic.currentTime = 0;


};

const playAgain = () => {
    frameNo = 0;
    x = 320;
    gameStarted = true;
    gameMessage.style.display = 'none';
    goCactus.play();
    themeMusic.play();
    animate();
};

const canvasGame = () => {
    frameNo = 0;
    canvas = document.querySelector('canvas');
    
    // CANVAS CONFIGURATION
    canvas.innerHeight = 320;
    canvas.innerWidth = 480;
    ctx = canvas.getContext('2d');

    // CHARACTER REF
    cactus = new Character(60, 100, 32, 32, '#006400');
};

// main event listeners
document.addEventListener('DOMContentLoaded', () => {
    gameMessage = document.querySelector('#game-message');
    gameStarted = false;
    canvasGame();
    document.addEventListener('keydown', keypressHandler);
});


// from w3 https://www.w3schools.com/graphics/game_obstacles.asp
// add an array of obstacles and loop through it
// let myObstacles = [];

// const collisionCheck = () => {
//     if (cactus.x + cactus.width > enemy.x &&
//         cactus.x < enemy.x + enemy.width &&
//         cactus.y + cactus.height > enemy.y &&
//         cactus.y < enemy.y + enemy.height) {
//             // console.log('collision detected successfully!');
//             enemy.stopRender();
//             return true;
//         }
// };

// document.addEventListener('DOMContentLoaded', () => {
//     // DOM REFERENCE
//     canvas = document.querySelector('canvas');
//     gameMessage = document.querySelector('#game-message');
//     // CANVAS CONFIGURATION
//     canvas.innerHeight = 320;
//     canvas.innerWidth = 480;
//     ctx = canvas.getContext('2d');

//     // CHARACTER REFERENCES
//     cactus = new Character(60, 100, 32, 32, '#006400');

//     gameStarted = false;

//     document.addEventListener('keydown', keypressHandler);
// });
// refactor as function
// canvas = document.querySelector('canvas');
//     gameMessage = document.querySelector('#game-message');
//     // CANVAS CONFIGURATION
//     canvas.innerHeight = 320;
//     canvas.innerWidth = 480;
//     ctx = canvas.getContext('2d');

//     // CHARACTER REFERENCES
//     cactus = new Character(60, 100, 32, 32, '#006400');

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