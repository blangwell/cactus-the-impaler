let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let gameMessage = document.getElementById('game-message');

let cactus = new Image();
let enemy = new Image();

cactus.src = './assets/images/cactoos2.png';
enemy.src = './assets/images/cactoos2.png';

let frameNo;
let gameStarted = false;
let gravity = 4;
let frames = 0;
// on key down'



const jump = () => {
    cactusY -= 30;
}

// enemy coordinates
let enemyArray = [];
enemyArray[0] = {
    x: canvas.width,
    y: canvas.height
}

class Cactus {
    constructor (x, y, height, width, src, jumping) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.src = src;
        this.jumping = jumping;
    }    
}

const controller = {
    jump: false,

    keypressHandler: function (e) {
        console.log(e); 
        switch(e.keyCode) {
            case (13):
                if (!gameStarted) { // start the game  
                    frameNo = 0;
                    gameStarted = true;
                    gameMessage.style.display = 'none';
                    break;
                } else if (gameStarted && !jump) { 
                    jump = true;
                    cactus.y -= 40;
                    // jump();
                    // gravityHandler();
                    break;
                }    
                default: 
                console.log('wrong key');
            }

    }
}

const gameLoop = () => {
    // frames++;
    console.log(frames);
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(cactus, cactusX, cactusY);
    // let randomNumber = -(Math.floor(Math.random() * Math.floor(50)))
    // this spawns new enemies
    for (let i = 0; i < enemyArray.length; i++) {
        ctx.drawImage(enemy, enemyArray[i].x, 100);
        enemyArray[i].x -= 3;
        // this almost works!
        if (enemyArray[i].x % 507 == 0) {
            enemyArray.push({
                x: canvas.width + cactus.width,
                y: 100
            })
        }
        console.log(enemyArray);
    }
    if (cactusY < 100 && cactusY >= 30) setTimeout(()=>{cactusY += gravity}, 1000);
    
     
}
// const gameLoop = () => {
//     let cactus = new Cactus(100, 60, 32, 32, './assets/images/cactoos2.png', false)
//     if (controller.jump === true) {
//         cactus.y -= 40;
//         cactus.jumping = true;
//     } 

//     // dont let cactus fall thru the floor
//     if (cactus.y != 100) {
//         setTimeout(() => {
//             cactus.jumping = false;
//             cactus.y += 2;
//         }, 500)
//     }
//     cactus.onload(ctx.drawImage(cactus.src, 100, 60))
// }

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', controller.keypressHandler);
    requestAnimationFrame(gameLoop);// this makes everything go
});

// const keypressHandler = (e) => {
    //     switch(e.keyCode) {
//         case (13):
//             if (!gameStarted) { // start the game  
//                 // frameNo = 0;
//                 gameStarted = true;
//                 gameMessage.style.display = 'none';
//                 // goCactus.play();
//                 // themeMusic.play();
//                 break;
//             } else if (gameStarted && !jumping) { 
//                 // cactus.y = 
//                 ;
//                 gravityHandler();
//                 break;
//             }    
//             default: 
//             console.log('wrong key');
//         }
//     };

// let enemyArray = [];
// enemyArray[0] = {
//     x: canvas.width,
//     y: canvas.height
// }
cactus = 'somepath'
cactusX = 100;
cactusY = 30;
const gameLoop = () => {
    // frames++;
    console.log(frames);
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(cactus, cactusX, cactusY);
    // let randomNumber = -(Math.floor(Math.random() * Math.floor(50)))
    // this spawns new enemies
    for (let i = 0; i < enemyArray.length; i++) {
        ctx.drawImage(enemy, enemyArray[i].x, 100);
        enemyArray[i].x -= 3;
        // this almost works!
        if (enemyArray[i].x % 507 == 0) {
            enemyArray.push({
                x: canvas.width + cactus.width,
                y: 100
            })
        }
        console.log(enemyArray);
    }
    if (cactusY < 100 && cactusY >= 30) setTimeout(()=>{cactusY += gravity}, 1000);
    
     
// }

// document.addEventListener('keydown', draw);