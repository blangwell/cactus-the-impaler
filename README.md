# CACTUS THE IMPALER
A pascifistic infinite runner where you play as the fiercest warrior time has ever known: __CACTUS__ (pronounced CACK-TOOS, and don't you forget it, mortal.) __CACTUS__ has slain many foes across the many battles of his bloody career. But now, the warrior heart of __CACTUS__ has softened! He is mortified by his past deeds! He no longer longs for death and destruction! Help guide __CACTUS__ away from the battlefield while sparing the enemies who cower in fear before you. Onward __CACTUS__, to gentler times!

## Technology
For this project I utilized HTML5 Canvas, CSS, and Javascript. My goal was to attain a minimum viable product by 7/28/20. I started by creating the scrolling motion with the `animate()` function and testing with rectangles. `xVelocity` tracks how much to increment the speed of the scroll.
```js
let x = 320;
let xVelocity = 4;
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    ctx.fillStyle = 'rgba(0, 100, 0, 1' // dark green!
    ctx.fillRect(60, 100, 32, 32); // cactus!
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    ctx.fillRect(x, 100, 32, 32); // cowering foe!
    x -= xVelocity; // move
};
```
Next I defined the `Character` class constructor to create our hero, CACTUS, along with our villains.
```js
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
```
I then set up the main event listener, set the canvas' width, defined the context of the canvas, and created CACTUS.
```js
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
```
At this point it was time for some collision logic! 
```js
const collisionCheck = () => {
    if (cactus.x + cactus.width > enemy.x &&
        cactus.x < enemy.x + enemy.width &&
        cactus.y + cactus.height > enemy.y &&
        cactus.y < enemy.y + enemy.height) {
            return true;
        }
};
```
Then I incorporated `collisionCheck` and the new `Character` instance of CACTUS into the `animate()` function.
```js
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
            resetGame();
        };
}
};
```

# Added Feature Branch!