const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const themeMusic = new Audio('./assets/sounds/three-red-hearts-quiet.wav');
const goCactus = new Audio('./assets/sounds/go-cactus.wav');
let gameStarted = false;
let cactus;
let enemy;

// CANVAS CONFIGURATION
canvas.innerHeight = 320;
canvas.innerWidth = 480;

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
    }
};

let x = 320;
let xScrollRate = 4;
const animate = () => {
    requestAnimationFrame(animate);
    themeMusic.play();
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    cactus = new Character(60, 100, 32, 32, '#006400')
    cactus.render();
    enemy = new Character(x, 100, 32, 32, '#000000')
    enemy.render();
    x -= xScrollRate; // move
};

const keypressHandler = (e) => {
    console.log(e);    
    switch(e.keyCode) {
        case (13):
            if (!gameStarted) { // start the game
                gameStarted = true;
                console.log(gameStarted);
                goCactus.play();
                animate();
            }; // jump call goes here
    }
}


// main event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', keypressHandler)
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