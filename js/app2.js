// start from scratch - lets GO
let game = document.getElementById('game-space') ;
let secretMessage = document.getElementById('secret-message')
let startStop;
let ctx;
let gameStarted = false;
let frameNo = 0;
let score = 0;
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
function Cactus(x, y, width, height, color, src) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height; 
    this.color = color;
    this.src = src
    this.alive = true;
    this.jumping = false;
    this.render = function () {
        // let cactusSprite = new Image();
        // cactusSprite.onload = function () {
        //     ctx.drawImage(cactusSprite, this.x, this.y)
        // }
        // cactusSprite.src = this.src; 
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        // ctx.drawImage(cactusSpriteSrc, this.x, this.y, this.width, this.height)
        
    }
}

let enemyArray = [];
enemyArray[0] = new Enemy(480, 250, 32, 32, '#000000')

let min = 100;
let max = 300;

const gameLoop = () => {
    // clears screen each frame and requests animationframe from self
    ctx.clearRect(0, 0, game.width, game.height);
    requestAnimationFrame(gameLoop);
    if (cactus.alive) {
        frameNo++; // increment frameNo;
        
        // track and display score 
        score = Math.round(frameNo / 10); // divide frames by 10 for score
        ctx.font = '15px Arial';
        ctx.fillText(`Score: ${score}`, 10, 20, 200)
        cactus
        // cactus.render();
        ctx.drawImage(cactusImage, cactus.x, cactus.y, cactus.width, cactus.height);
        
        themeMusic.play();
        // create a random number each iteration
        let random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
        
        // scroll enemies across x axis
        for (let i = 0; i < enemyArray.length; i++) {
            let eachEnemy = enemyArray[i];
            eachEnemy.render();
            eachEnemy.x -= 4; // scroll left
            
            // render enemies at random
            if (eachEnemy.x === random) {
                enemyArray.push(new Enemy(480, 250, 32, 32, '#000000'))
               
            } else if (eachEnemy.x === 0 && enemyArray.length < 4) { // in case enemy gets to 0 with no new enemies
                enemyArray.push(new Enemy(480, 250, 32, 32, '#000000'))
            }            // randomEnemy(eachEnemy.x);

            // this removes enemies from enemiesArray once they have fully left the screen
            if (eachEnemy.x < -eachEnemy.width) {
                enemyArray.shift();
            }
            // check for collision between cactus and each enemy on the screen
            if (collisionCheck(cactus, eachEnemy)) {
                endGame(score);
            }
        } 
        // console.log(enemyArray.length);
    } // else condition here could make code cleaner
    
};

const collisionCheck = (cactus, currentEnemy) => {
    if (cactus.x + cactus.width > currentEnemy.x && // will need to be refactored for enemy class
        cactus.x < currentEnemy.x + currentEnemy.width &&
        cactus.y + cactus.height > currentEnemy.y &&
        cactus.y < currentEnemy.y + currentEnemy.height) {
            console.log('collision!')
            collisionSound.play();
            return true;
        }
};

const endGame = (score) => {
    cactus.alive = false; // setting cactus to not alive stops rendering everything on screen.
    frameNo = 0;
    themeMusic.pause();
    themeMusic.currentTime = 0;
    startStop.innerText = 'Click Here to Restart';
    secretMessage.innerText = `NO, CACTUS !\nscore: ${score}`;
    secretMessage.style.display = 'block';
    score = 0;
};

// add keys inputs to create player jumps
const keydownHandler = (e) => {
    switch(e.keyCode) {
        case (87): // w key
            if (!cactus.jumping) { // if cactus isn't jumping
                cactus.jumping = true; // set jumping to true, as he jumps
                cactus.y -= 40; // move cactus up 40 px
                cactusImage.src = './assets/images/cactoos_jump.png'
                jumpSound.play();
                setTimeout(() => {
                    cactus.y += 40;
                    cactus.jumping = false;
                    cactusImage.src = './assets/images/cactoos2.png' // set jumping back to false to jump again;
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
    cactusImage = new Image()
    cactusImage.src = './assets/images/cactoos2.png' 
    
    startStop = document.querySelector('#start-stop');
    startStop.addEventListener('click', ()=> {
        if (!gameStarted) {
            gameStarted = true;
            cactus = new Cactus(60, 250, 32, 32, 'darkgreen', './assets/images/cactoos2.png'); // y 'floor' is at 250px - cactus.y (32)
            startStop.textContent = 'Click Here to Restart';
            goCactus.play(); 

            // listen for keypress to jump
            document.addEventListener('keydown', keydownHandler);
            gameLoop();

        } else if (gameStarted) {
            location.reload(); // WAY easier than the logic i was trying to implement
        }

    })
});