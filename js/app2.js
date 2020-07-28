// start from scratch - lets GO
let game = document.getElementById('game-space') ;
let gameMessage;
let ctx;
const themeMusic = new Audio('./assets/sounds/three-red-hearts-quiet.wav');
const goCactus = new Audio('./assets/sounds/go-cactus.wav');
const jumpSound = new Audio('./assets/sounds/jump.wav');
// add background image source
let backgroundImage = new Image();
backgroundImage.src = './assets/images/placeholder-bg.png';

// add background to canvas
// scroll the canvas



// enemies created and scrolled
// enemies should have an x, y, width, height, color)
// color will be replaced by src
function Enemy(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.alive = true;
    this.render = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// player constructor
function Cactus(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height; 
    this.color = color;
    this.alive = true;
    this.jumping = false;
    this.render = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
let enemyArray = []
enemyArray[0] = {
    x : game.width,
    y : game.height
}

const gameLoop = () => {
    // loop theme music
    themeMusic.play();
    ctx.clearRect(0, 0, game.width, game.height);
    ctx.fillStyle = '#000000'
    // requestAnimationFrame(gameLoop);
    if (cactus.alive) {
        cactus.render();

        // render enemies at random
        // scroll enemies across x axis
        // for loop?
        for (let i = 0; i < enemyArray.length; i++) {
            enemy = new Enemy (enemyArray[i].x, 100, 32, 32, '#000000');
            enemy.render();
            enemyArray[i].x -= 2; // scroll left
            if (enemyArray[i].x % 507 == 0) {
                enemyArray.push({
                    x: game.width + cactus.width,
                    y: 100
                })
            }
        }
        // enemy = new Enemy(300, 250, 32, 32, '#000000');
        // enemy.render();
        // enemy.x--;
        
    }
    
}

// add keys inputs to create player jumps
const keydownHandler = (e) => {
    switch(e.keyCode) {
        case (87): // w key
            if (!cactus.jumping) { // if cactus isn't jumping
                cactus.jumping = true; // set jumping to true, as he jumps
                cactus.y -= 40; // move cactus up 40 px
                jumpSound.play();
                setTimeout(() => {
                    cactus.y += 40;
                    cactus.jumping = false; // set jumping back to false to jump again;
                }, 600)
            } else {
                console.log('no double jump');
            }
    }
};

// click to start game
// event listener on game-message
// create game message variable
document.addEventListener('DOMContentLoaded', () => {
    
    
    // configure the canvas
    // create canvas context
    // set canvas width / height
    game.setAttribute('width', 480);
    game.setAttribute('height', 320);
    ctx = game.getContext('2d');
    
    
    gameMessage = document.getElementById('game-message')
    gameMessage.addEventListener('click', ()=> {
        gameMessage.textContent = 'Click Here to Stop';
        
        goCactus.play(); // play go cactus once
        // create cactus instance
        
        cactus = new Cactus(60, 250, 32, 32, 'darkgreen'); // y 'floor' is at 250px - cactus.y (32)

        // listen for keypress to jump
        document.addEventListener('keydown', keydownHandler);
        let runGame = setInterval(gameLoop, 60);
    })
})



