// start from scratch - lets GO
let game;
let gameMessage;
let ctx;
const themeMusic = new Audio('./assets/sounds/three-red-hearts-quiet.wav');
const goCactus = new Audio('./assets/sounds/go-cactus.wav');
const jumpSound = new Audio('./assets/sounds/jump.wav');

// create canvas context
// set canvas width / height
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

const gameLoop = () => {
    // loop theme music
    themeMusic.play();
    ctx.clearRect(0, 0, game.width, game.height);
    // requestAnimationFrame(gameLoop);
    if (cactus.alive) cactus.render();
    
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
                }, 500)
            } else {
                console.log('no double jump');
            }
    }
};

// click to start game
// event listener on game-message
// create game message variable
gameMessage = document.getElementById('game-message')
document.addEventListener('DOMContentLoaded', () => {
    game = document.getElementById('game-space') 
    console.log(game);
    // configure the canvas
    game.setAttribute('width', 480);
    game.setAttribute('height', 320);
    ctx = game.getContext('2d');


    gameMessage.addEventListener('click', ()=> {
        gameMessage.textContent = 'Click Here to Stop';
        
        goCactus.play(); // play go cactus once
        // create cactus instance
        
        cactus = new Cactus(60, 250, 32, 32, '#000000'); // y 'floor' is at 250 px

        // listen for keypress to jump
        document.addEventListener('keydown', keydownHandler);
        let runGame = setInterval(gameLoop, 60);
    })
})



