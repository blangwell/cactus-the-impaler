const themeMusic = new Audio('./assets/sounds/three-red-hearts-quiet.wav');
const goCactus = new Audio('./assets/sounds/go-cactus.wav');
const jumpSound = new Audio('./assets/sounds/jump.wav');
const collisionSound = new Audio('./assets/sounds/explode.wav')
let gameStarted;
let gameMessage;
let canvas;
let ctx;
let enemy;
let jumping = false; 
let frameNo = 0;
let x;
let xScrollRate;

// everytime a column goes off screen, another should be loaded
// array of objects, enemies, background, etc



// class Character {
//     constructor(x, y, height, width, color){
//         this.x = x;
//         this.y = y;
//         this.height = height;
//         this.width = width;
//         this.color = color;
//         this.alive = true;
//         this.render = function () {
//             ctx.fillStyle = this.color;
//             ctx.fillRect(this.x, this.y, this.width, this.height)
//             // // this.x = 320;
//             // this.x = this.xStart;
//             // this.x -= 4;
//         }
//         this.stopRender = function () {
//             ctx.clearRect(this.x, this.y, this.width, this.height);
//         }
//     }
// };


// const animate = () => {
    //     xScrollRate = 4;
    //     let distance = Math.round(frameNo/50);
    //     console.log(distance);
    //     if (gameStarted) {
        //         requestAnimationFrame(animate);
//         ctx.clearRect(0, 0, innerWidth, innerHeight);
//         frameNo++; // increment frameNo

//         cactus.render(); 
//         enemy = new Character(x, 100, 32, 32, '#000000', 320); // randomizer will go here
//         // enemy.x -= xScrollRate;
//         x -= xScrollRate; // move
//         enemy.render();

//         // if (frameNo % 2 === 0 && enemy.x < -enemy.width){
    
    //         let randomVar = Math.floor(Math.random() * Math.floor(27));
    //         if (frameNo % randomVar === 0){
        //             // x = 320;
        //             nextEnemy = new Character(320, 100, 32, 32, '#000000');
        //             nextEnemy.x -= xScrollRate;
        //             nextEnemy.render();
        //         }
        //         // if (frameNo % Math.floor(Math.random() * Math.floor(10)))
        
        //         if (collisionCheck()) {
            //             console.log('collision');
            //             collisionSound.play();
            //             xScrollRate = 0;
            //             endGame();
            
            //         };
            //     }
            // };
// gameLoop
class Cactus {
    constructor(x, y, width, height, src) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.src = src;
    } 
    render() {
        console.log('render');
    }
}
// let cactus = {
//     x : 60,
//     y : 100,
//     width : 32,
//     height : 32,
//     src : './assets/images/cactoos2.png'
// }

cactus = new Cactus(60, 100, 32, 32, './assets/images/cactoos2.png')

xScrollRate = 4;
const simpleAnimate = (character) => {
    x = 320;
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    canvas.innerHeight = 320;
    canvas.innerWidth = 480;

    if (gameStarted) {
        requestAnimationFrame(simpleAnimate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        frameNo++

        // the drawImage call that couldn't do its fucking job. 
        cactus.src.onload = () => {
            ctx.drawImage(cactus.src, cactus.x, cactus.y, 32, 32);
        };
        ctx.fillStyle = 'darkgreen';
        // ctx.fillRect(cactus.x, cactus.y, 32, 32) 
    }
}

const keypressHandler = (e) => {
    console.log(e);    
    switch(e.keyCode) {
        case (13):
            if (!gameStarted) { // start the game  
                // call animation
                playAgain()
                break;
            } else if (gameStarted && !jumping) { 
                // cactus.y = 
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
        return cactus.y;
    };
    

const collisionCheck = () => {
    if (cactus.x + cactus.width > enemy.x && // will need to be refactored for enemy class
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
    // simpleAnimate(cactus);
};


// main event listeners
document.addEventListener('DOMContentLoaded', () => {
    
    gameMessage = document.querySelector('#game-message');
    gameStarted = false;
    document.addEventListener('keydown', keypressHandler); // this runs the keypressHandler separate from gameLoop 
    let runGame = setInterval(simpleAnimate, 60)
});



// maybe we can draw all the enemies in advance
// set their x positions to far off the canvas and scroll?
// let cactusSprite = new Image();
// cactusSprite.src = ('./assets/images/cactoos2.png');

// function draw() {
//     ctx.drawImage(background, 0, 0);
//     ctx.drawImage(cactusSprite, x, y, width, height);
//     ctx.drawImage(enemy, x, y, width, height);
//     // array of obstacles
//     enemyArray[0] = {
//         x: canvas.width,
//         y: 0
//     };
//     for (let i = 0; i< pipe.length; i++) {
//         ctx.drawImage(enemy, enemyArray[i].x, enemyArray[i].y);
//         enemyArray[i].x--;
//         if (enemyArray[i].x == canvas.width - canvas.width/2){
//             enemyArray.push(x: canvas.width, y: Math.floor(Math.random() * enemy.width) - enemy.x);
//             }
//     }


// this should be enemy. have multiple enemies.
// // cactus should be an object, there is only one cactus.
// class Character {
//     constructor(x, y, height, width, color){
//         this.x = x;
//         this.y = y;
//         this.height = height;
//         this.width = width;
//         this.color = color;
//         this.alive = true;
//         this.render = function () {
//             ctx.fillStyle = this.color;
//             ctx.fillRect(this.x, this.y, this.width, this.height)
//             // // this.x = 320;
//             // this.x = this.xStart;
//             // this.x -= 4;
//         }
//         this.stopRender = function () {
//             ctx.clearRect(this.x, this.y, this.width, this.height);
//         }
//     }
// };

// enemy = new Character(320, 100, 32, 32, '#000000');

x = 320;
// animate could take object as an arg? ? ?
// enemy off the canvas stop the animation delete enemy. 
const animate = () => {
    xScrollRate = 4;
    let distance = Math.round(frameNo/50);
    console.log(distance);
    if (gameStarted) {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        frameNo++; // increment frameNo

        cactus.render(); 
        enemy = new Character(x, 100, 32, 32, '#000000', 320); // randomizer will go here
        // enemy.x -= xScrollRate;
        x -= xScrollRate; // move
        enemy.render();

        // if (frameNo % 2 === 0 && enemy.x < -enemy.width){

        let randomVar = Math.floor(Math.random() * Math.floor(27));
        if (frameNo % randomVar === 0){
            // x = 320;
            nextEnemy = new Character(320, 100, 32, 32, '#000000');
            nextEnemy.x -= xScrollRate;
            nextEnemy.render();
        }
        // if (frameNo % Math.floor(Math.random() * Math.floor(10)))

        if (collisionCheck()) {
            console.log('collision');
            collisionSound.play();
            xScrollRate = 0;
            endGame();
            
        };
    }
};
            
            // const canvasGame = () => {
                //     frameNo = 0;
                //     // canvas = document.querySelector('canvas');
                
                //     // CANVAS CONFIGURATION
                //     
                
                //     // CHARACTER REF
                
                //     playAgain();
                //     // simpleAnimate(cactus);
                // };
                
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