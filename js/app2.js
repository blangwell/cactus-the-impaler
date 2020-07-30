// start from scratch - lets GO
let game = document.getElementById('game-space') ;
let secretMessage = document.getElementById('secret-message')
let startStop;
let ctx;
let gameStarted = false;
let frameNo = 0;
let score = 0;
let enemyArray = [];
const themeMusic = new Audio('./assets/sounds/three-red-hearts-quiet.wav');
const goCactus = new Audio('./assets/sounds/go-cactus.wav');
const jumpSound = new Audio('./assets/sounds/jump.wav');
const collisionSound = new Audio('./assets/sounds/explode.wav')

// enemies created and scrolled
// enemies should have an x, y, width, height, color)
// color will be replaced by src
function Enemy(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.render = function (eachEnemy) {
        let enemy = new Image();
        enemy.src = './assets/images/wizard.png'
        ctx.drawImage(enemy, eachEnemy.x, eachEnemy.y, this.width, this.height);
    }
}

// player constructor
function Cactus(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height; 
    this.alive = true;
    this.jumping = false;
    this.render = function () {
        let cactusImageArray = ['./assets/images/cactusv2walk1.png', './assets/images/cactusv2walk2.png']
        let cactusImage = new Image();
        if (this.jumping) {
            cactusImage.src = './assets/images/cactusv2jump.png'
        } else if (!this.jumping && score % 2 === 0) {
            cactusImage.src = cactusImageArray[0];
        } else if (!this.jumping && score % 2 !== 0) {
            cactusImage.src = cactusImageArray[1];
        }
        ctx.drawImage(cactusImage, this.x, this.y, this.width, this.height);
    }
}


let min = 100;
let max = 300;
let scrollSpeed = 1;
let bgX = 0;
enemyArray[0] = new Enemy(480, 260, 48, 48)
const gameLoop = () => {
    // CLEAR SCREEN AND ANIMATE EACH FRAME
    ctx.clearRect(0, 0, game.width, game.height);
    requestAnimationFrame(gameLoop);
    if (cactus.alive) {
        frameNo++;       
        
        // DRAW AND SCROLL BACKGROUND  
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(bgImage, bgX, 0, game.width, game.height); 
        //2nd bg image to scroll infinitely
        ctx.drawImage(bgImage, bgX + game.width, 0, game.width, game.height); 
        bgX -= scrollSpeed;
        if (bgX === -game.width) bgX = 0;
        
        // DRAW SCORE
        score = Math.round(frameNo / 10);
        ctx.font = '15px Courier New';
        ctx.fillStyle = 'white';
        ctx.fillText(`Score: ${score}`, game.width - 100, 305, 200)
        
        // DRAW CACTUS
        cactus.render();
        themeMusic.play();
        let random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
        
        // GENERATE AND SCROLL ENEMIES
        for (let i = 0; i < enemyArray.length; i++) {
            let eachEnemy = enemyArray[i];
            eachEnemy.render(eachEnemy);
            eachEnemy.x -= 4; // scroll left
            
            // render enemies at random
            if (eachEnemy.x === random) {
                enemyArray.push(new Enemy(480, 260, 48, 48))
            
                // in case enemy gets to 0 with no new enemies
            } else if (eachEnemy.x === 0 && enemyArray.length < 4) {
                enemyArray.push(new Enemy(480, 260, 48, 48))
            }            // randomEnemy(eachEnemy.x);

            // this removes enemies from enemiesArray once they have left the screen
            if (eachEnemy.x < -eachEnemy.width) {
                enemyArray.shift();
            }

            // check for collision between cactus and each enemy on the screen
            if (collisionCheck(cactus, eachEnemy)) {
                endGame(score);
            }
        } 
    }   
};

const collisionCheck = (cactus, currentEnemy) => {
    // offset for tranparent edges of sprite
    if ((cactus.x + cactus.width - 25) > currentEnemy.x && 
        cactus.x + 10 < (currentEnemy.x + currentEnemy.width) &&
        (cactus.y + cactus.height ) > currentEnemy.y) {
            console.log('collision!')
            collisionSound.play();
            return true;
        }
};


const keydownHandler = (e) => {
    switch(e.keyCode) {
        case (87): // w key
        if (!cactus.jumping && cactus.alive) { // if cactus isn't jumping
        cactus.jumping = true; // set jumping to true, as he jumps
        cactus.y -= 50; // move cactus up 40 px
        jumpSound.play();
        setTimeout(() => {
            cactus.y += 50; // gravity
            cactus.jumping = false;
        }, 600)
    } else {
        console.log('no double jump');
    }
}
};

const endGame = (score) => {
    cactus.alive = false; // stops rendering everything on screen.
    frameNo = 0;
    themeMusic.pause();
    themeMusic.currentTime = 0;
    startStop.innerText = 'Click Here to Reset';
    secretMessage.innerText = `NO, CACTUS !\nscore: ${score}`;
    secretMessage.style.display = 'block';
    score = 0;
};

const displayInstructions = () => {
    secretMessage.innerText = 'Press W to Jump \n Spare Thine Enemies!';
    secretMessage.style.display = 'block';
    setTimeout(() => {secretMessage.style.display = 'none'}, 3000)
};


let bgImage = new Image();
let cactus = new Cactus(50, 240, 64, 64);
document.addEventListener('DOMContentLoaded', () => {
    // CONFIGURE CANVAS
    game.setAttribute('width', 480);
    game.setAttribute('height', 320);
    ctx = game.getContext('2d');

    bgImage.src = './assets/images/pixel-bricks.png';

    instructions = document.getElementById('instructions')
    instructions.addEventListener('click', displayInstructions);

    startStop = document.querySelector('#start-stop');
    startStop.addEventListener('click', ()=> {

        if (!gameStarted) {
            gameStarted = true;
            startStop.textContent = 'Click Here to Reset';
            goCactus.play(); 
            // listen for keypress to jump
            document.addEventListener('keydown', keydownHandler);
            gameLoop();

        } else if (gameStarted) {
            location.reload(); // WAY easier than the logic i was trying to implement
        }

    });
});