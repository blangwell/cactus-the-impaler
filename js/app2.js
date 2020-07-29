// start from scratch - lets GO
let game = document.getElementById('game-space') ;
let secretMessage = document.getElementById('secret-message')
let startStop;
let ctx;
const themeMusic = new Audio('./assets/sounds/three-red-hearts-quiet.wav');
const goCactus = new Audio('./assets/sounds/go-cactus.wav');
const jumpSound = new Audio('./assets/sounds/jump.wav');
const collisionSound = new Audio('./assets/sounds/explode.wav')


// TODO Click to try again logic
// TODO Fix randomization
// TODO Add sprites

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
let enemyArray = [];
enemyArray[0] = new Enemy(480, 250, 32, 32, '#000000')


const gameLoop = () => {
     // clears screen each frame and requests animationframe from self
    ctx.clearRect(0, 0, game.width, game.height);
    requestAnimationFrame(gameLoop);
    if (cactus.alive) {
        themeMusic.play();
        cactus.render();
        
        
        // scroll enemies across x axis
        for (let i = 0; i < enemyArray.length; i++) {
            let eachEnemy = enemyArray[i];
            // console.log(eachEnemy);
            eachEnemy.render();
            eachEnemy.x -= 4; // scroll left
            
            // create a random number
            let min = 1000;
            let max = 50000;
            let random = Math.floor(Math.random() * (max + 1 - min)) + min;
            // console.log(random);
            if (eachEnemy.x === 100){
                // render enemies at random
                setTimeout(() => {
                    enemyArray.push(new Enemy(480, 250, 32, 32, '#000000'))
                    , random}) // this won't spit things out at random
            }
            // this removes enemies from enemiesArray once they have fully left the screen
            if (eachEnemy.x < -eachEnemy.width) {
                enemyArray.shift();
            }
            if (collisionCheck(cactus, eachEnemy)) {
                endGame();
            }
        } 
        console.log(enemyArray.length);
    } // else condition here could make code cleaner
    
}

const collisionCheck = (cactus, currentEnemy) => {
    if (cactus.x + cactus.width > currentEnemy.x && // will need to be refactored for enemy class
        cactus.x < currentEnemy.x + currentEnemy.width &&
        cactus.y + cactus.height > currentEnemy.y &&
        cactus.y < currentEnemy.y + currentEnemy.height) {
            console.log('collision!')
            collisionSound.play();
            return true;
        }
}

const endGame = () => {
    cactus.alive = false; // setting cactus to not alive stops rendering everything on screen.
    themeMusic.pause();
    themeMusic.currentTime = 0;
    startStop.innerText = 'Click to Try Again';
    secretMessage.innerText = 'No, Cactus!';
    secretMessage.style.display = 'block';


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
    
    
    startStop = document.querySelector('#start-stop');
    startStop.addEventListener('click', ()=> {
        cactus = new Cactus(60, 250, 32, 32, 'darkgreen'); // y 'floor' is at 250px - cactus.y (32)
        startStop.textContent = 'Click Here to Stop';
        goCactus.play(); 
        // create cactus instance

        // listen for keypress to jump
        document.addEventListener('keydown', keydownHandler);
        gameLoop();
        
    })
})



