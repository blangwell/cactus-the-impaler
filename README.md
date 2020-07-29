# CACTUS THE IMPALER
A pascifistic infinite runner where you play as the fiercest warrior time has ever known: __CACTUS__ (pronounced CACK-TOOS, and don't you forget it, mortal.) __CACTUS__ has slain many foes across the many battles of his bloody career. But now, the warrior heart of __CACTUS__ has softened! He is mortified by his past deeds! He no longer longs for death and destruction! Help guide __CACTUS__ away from the battlefield while sparing the enemies who cower in fear before you. Onward __CACTUS__, to gentler times!

## Technology
For this game I utilized HTML5 Canvas, CSS, and Vanilla Javascript. My goal was to attain a minimum viable product by 7/29/20. Minimum viable product in this case was: obstacles scroll towards player, player jumps over obstacles, if player collides with an obstacle a game over state is triggered.

### Attempt 1 
I started by creating the scrolling motion with the `animate()` function and testing with rectangles. `xVelocity` tracks how much to increment the speed of the scroll.
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
There were _several_ problems with this approach. The first problem with this strategy is that if I wanted to have multiple enemies on the screen at once, each instance would need to have an independent x coordinate. That would be impossible by setting `let x = 320` and expecting that to account for each class instance's animation. Each item would render on top of the other. Additionally, I would not be utilizing the Character class constructor properly. Ultimately, I also decided to have different constructors for CACTUS and the enemies (more on that below).

I then set up the main event listener, set the canvas' width, defined the 2d context of the canvas, and created CACTUS. I thought this process was successful at first glance, but refactoring the code showed me that the canvas size was not being set to the correct size. I was not looking at 480x320px, but rather the default canvas size of 300x150px. 
```js
document.addEventListener('DOMContentLoaded', () => {
    // DOM REFERENCE
    canvas = document.querySelector('canvas');
    gameMessage = document.querySelector('#game-message');
    // CANVAS CONFIGURATION
    canvas.innerHeight = 320; // this did not work! 
    canvas.innerWidth = 480;
    ctx = canvas.getContext('2d');

    // CHARACTER REFERENCES
    cactus = new Character(60, 100, 32, 32, '#006400');

    gameStarted = false;
```
At this point I wrote the basic collision logic. No real problem here. 
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
Then I incorporated `collisionCheck` and the new `Character` instance of CACTUS into the `animate()` function. As you can see below, the `Character` instance `enemy` could have easily been decremented by replacing `x -= xScrollRate` with `enemy.x -= xScrollRate`. For whatever reason this was not apparent to me. 
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
Soon, I devised this browser-crashing attempt at randomizing the enemies: 
```js
const animate = () => {
    ...
        let randomVar = Math.floor(Math.random() * Math.floor(27));
        // DONT DO THIS
        if (frameNo % randomVar === 0){
            // x = 320;
            nextEnemy = new Character(320, 100, 32, 32, '#000000');
            nextEnemy.x -= xScrollRate;
            nextEnemy.render();
        }
    }
};
```
## Technology

# Added Feature Branch!

