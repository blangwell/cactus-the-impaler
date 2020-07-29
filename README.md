# CACTUS THE IMPALER
A pascifistic infinite runner where you play as the fiercest warrior time has ever known: __CACTUS__ (pronounced CACK-TOOS, and don't you forget it, mortal.) __CACTUS__ has slain many foes across the many battles of his bloody career. But now, the warrior heart of __CACTUS__ has softened! He is mortified by his past deeds! He no longer longs for death and destruction! Help guide __CACTUS__ away from the battlefield while sparing the enemies who cower in fear before you. Onward __CACTUS__, to gentler times!

## Technology
For this game I utilized HTML5 Canvas, CSS, and Vanilla Javascript. My goal was to attain a minimum viable product by 7/29/20. Minimum viable product in this case was: obstacles scroll towards player, player jumps over obstacles, if player collides with an obstacle a game over state is triggered. In this readme, I will put my failures on display both for posterity and to help anyone who may be in a similar position as the one I found myself while building this game.

## Attempt 1 
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
There were _several_ problems with this approach. The first problem with this strategy is that if I wanted to have multiple enemies on the screen at once, each instance would need to have its own independent x coordinate. That would be impossible by setting `let x = 320` and expecting that to account for each class instance's animation. Each item would render on top of the other. Additionally, I would not be utilizing the Character class constructor properly. Ultimately, I decided to have two different constructors for CACTUS and the enemies (more on that below).

I then set up the main event listener, set the canvas' width, defined the 2d context of the canvas, and created CACTUS. I thought this process was successful at first glance, but refactoring the code showed me that the canvas was not being set to the correct size. I was not looking at 480x320px, but rather the default canvas size of 300x150px. 
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
Then I incorporated `collisionCheck` and the new `Character` instance of CACTUS into the `animate()` function. As you can see below, the `Character` instance `enemy`'s x coordinate could have easily been decremented by replacing `x -= xScrollRate` with `enemy.x -= xScrollRate`. For whatever reason this was not apparent to me. 
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
Soon, I devised this particularly nasty, browser-crashing attempt at randomizing the enemies: 
```js
const animate = () => {
    ...
        // DONT DO THIS
        let randomVar = Math.floor(Math.random() * Math.floor(27));
        if (frameNo % randomVar === 0){
            nextEnemy = new Character(320, 100, 32, 32, '#000000');
            nextEnemy.x -= xScrollRate;
            nextEnemy.render();
        }
    }
};
```
It is around this point I sought counsel with my instructors. _Special thanks to @romebell, @ahonore42, and @petefitton for their gentle guidance in reapproaching and refactoring this project; and a big thank you to @TaylorDarneille for moral support when the imposter syndrome hit_

## Attempt 2
At this point I pseudocoded out the entire project again with new perspective. The general steps were as follows:
- Click to start game
- Make one enemy scroll left across the canvas
- Randomly generate new enemies to scroll across the canvas
- Make player jump on keypress
- Detect player collisions with enemies
- End game if collision detected
- Style as needed
I set up a `DOMContentLoaded` event listener, set the canvas size properly, and created the `ctx` variable
```js
let game = document.getElementById('game-space') ;
document.addEventListener('DOMContentLoaded', () => {
    // configure the canvas
    // create canvas context
    // set canvas width / height
    game.setAttribute('width', 480);
    game.setAttribute('height', 320);
    ctx = game.getContext('2d');
```
Next up it was time to make an enemy scroll across the screen. I used the naming convention `gameLoop()` as it seemed to most descriptive to me. 
```js
const gameLoop = () => {
    // CLEAR SCREEN AND ANIMATE EACH FRAME
    ctx.clearRect(0, 0, game.width, game.height);
    requestAnimationFrame(gameLoop);
```
Since there was ultimately going to be multiple enemies spawned, I created the `Enemy` class constructor (identical to the class above in Attempt 1 with the new name). At this point, it was time to find a better way to scroll separate instances of the `Enemy` class across the canvas.
This is where the Duck Duck Go-fu really came in handy. One method I found from a similar infinite runner game, used an array of obstacles and looped through them. Sounded like a plan to me. Above the scope of the `gameLoop` I added
```js
let enemyArray = [];
enemyArray[0] = new Enemy(480, 270, 32, 32, '#000000')
```
Next I created a for loop to iterate over `enemyArray`. Seeing as how there was only one item in the array, I would need to push new instances of the `Enemy` class into `enemyArray` so that the iterative process could continue for the length of the game. I did this randomly by defining a variable `random` to generate a random number between 100 and 300
```js
let min = 100;
let max = 300;
let random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
for (let i = 0; i < enemyArray.length; i++) {
    let eachEnemy = enemyArray[i];
    eachEnemy.render();
    eachEnemy.x -= 4; // scroll each enemy left left
    
    // render enemies at random
    if (eachEnemy.x === random) {
        enemyArray.push(new Enemy(480, 270, 32, 32, '#000000'))
    }
```
This worked! It was wonderful. Fantastic. I was done now, right? Not so fast! Upon testing the game a few times, two big problems became apparent.

The first problem was that, during some iterations, enemies would hardly spawn at all. The game canvas would be empty for ten to twenty seconds at a time. I added a piece of logic to generate a new enemy if one enemy scrolled off screen while there were less than four enemies in the enemy array.
```js
    // in case enemy gets to 0 with no new enemies
    } else if (eachEnemy.x === 0 && enemyArray.length < 4) { 
        enemyArray.push(new Enemy(480, 270, 32, 32, '#000000'))
    }           
```
Which leads to the second problem. After running the game for about 75 seconds, I tried to close the browser window and it wouldn't respond. It was doing so much work keeping track of `enemyArray` objects that were off screen, It was crashing the browser. I got around this by calling `enemyArray.shift()` once an enemy left the screen. This removes the first item from an array and _shifts_ the other items left. I officially had garbage collection logic. 
```js
// this removes enemies from enemiesArray once they have fully left the screen
    if (eachEnemy.x < -eachEnemy.width) {
        enemyArray.shift();
    }
```
I refreshed the page and got a surge of dopamine. The game was running great and enemies were being generated randomly! Next up was to get CACTUS on the screen and make them jump! 
```js
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
```
### Added Feature Branch!

