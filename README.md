# CACTUS THE IMPALER
[About](##About)\
[Technology](##Technology)\
[Attempt One](##attempt-one)\
[Attempt Two](##attempt-two)\
[Feature Branch](##feature-branch)\
[Deployment](##deployment)\
[Conclusion](##conclusion)

## About
A pascifistic infinite runner where you play as the fiercest warrior time has ever known: __CACTUS__ (pronounced CACK-TOOS, and don't you forget it, mortal.) __CACTUS__ has slain many foes across the many battles of his bloody career. But now, the warrior heart of __CACTUS__ has softened! He is mortified by his past deeds! He no longer longs for death and destruction! Help guide __CACTUS__ away from the battlefield while sparing the enemies who cower in fear before you. Onward __CACTUS__, to gentler times!

## Technology
For this game I utilized HTML5 Canvas, CSS, and Vanilla Javascript. My goal was to attain a minimum viable product by 7/29/20. Minimum viable product in this case was: obstacles scroll towards player, player jumps over obstacles, if player collides with an obstacle a game over state is triggered. In this readme, I will put my failures on display both for posterity and to help anyone who may be in a similar position as the one I found myself while building this game. _Note:_ I have left the two defunct scripts (**app.js** and **app1.js**) in the repo for the sake of posterity. For the up to date script, please refer to **app2.js**.

## Attempt One
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
        enemy = new Character(x, 100, 32, 32, '#000000'); 
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
It is around this point I sought counsel with my instructors. _Special thanks to @romebell and @petefitton for their gentle guidance in reapproaching and refactoring this project; and a big thank you to @TaylorDarneille for moral support when the imposter syndrome hit_

## Attempt Two
At this point I created another new javascript file **app2**. I then pseudocoded out the entire project again with new perspective. The general steps were as follows:
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
I refreshed the page and got a surge of dopamine. The game was running great and enemies were being generated randomly! Next up was to get CACTUS on the screen and make them jump! I made a class constructor just for CACTUS, as he behaves differently than the enemies. I drew him as a dark green rectangle to the canvas for testing purposes and created the `keydownHandler()` function.
```js
const keydownHandler = (e) => {
    switch(e.keyCode) {
        case (87): // w key
            if (!cactus.jumping) { // if cactus isn't jumping
                // set jumping to true, to prevent double jumps
                cactus.jumping = true; 
                cactus.y -= 50; // move cactus up
                jumpSound.play();
                setTimeout(() => {
                    cactus.y += 50;
                    cactus.jumping = false; // set jumping back to false
                }, 600) // wait ~ half second for gravity to take effect
            } else {
                console.log('no double jump');
            }
    }
};
```
Everything was going great when CACTUS was just a rectangle on the canvas. It was time to add a sprite image to the canvas. This was one of my last big roadblocks in obtaining MVP. Below is how the `Cactus` constructor looked through my testing. It should be a good indicator of my struggle and misunderstanding. 
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
More Duck Duck Go-fu didn't seem to reveal my issue until I stopped and examined the differences between my code and the working examples I was referring to. It turns out the issue was that, instead of passing `drawImage()` and image, I was attempting to pass the image path string. A little more research revealed that the code below would get the sprites rendering. 
```js
// create new instance of js Image class
let cactusImage = new Image(); 
document.addEventListener('DOMContentLoaded', () => {
    game.setAttribute('width', 480);
    game.setAttribute('height', 320);
    ctx = game.getContext('2d');
    // SET THE IMAGE SRC PROPERTY
    cactusImage.src = './assets/images/cactoos2.png';
```
Then in the `gameLoop()`
```js
ctx.drawImage(cactusImage, cactus.x, cactus.y, cactus.width, cactus.height);
```
By learning to pass `ctx.drawImage()` an actual instance of `Image` instead of a string, I was officially ready to add CACTUS' sprite and a background image.
```js
let cactusImage = new Image();
let bgImage = new Image();
...
cactusImage.src = './assets/images/cactoos2.png';
bgImage.src = './assets/images/pixel-bricks.png';
```
In the `gameLoop` I disabled image smoothing to make the upscaled sprites look clearer. I drew two background images. The first was inside of the canvas with the second just off screen and set them both to scroll. Once one left the screen, the other would scroll. When the first image was equal to `-game.width`, the images' x coordinates were reset to zero. 
```js
let scrollSpeed = 1;
let bgX = 0;
ctx.imageSmoothingEnabled = false;
ctx.drawImage(bgImage, bgX, 0, game.width, game.height);
ctx.drawImage(bgImage, bgX + game.width, 0, game.width, game.height); // this works!
bgX -= scrollSpeed;
if (bgX === -game.width) bgX = 0;
```
I added an incrementing score counter to the canvas and, with that, MVP had been achieved!

## Feature Branch
At this point I created a feature branch to experiment with, you guessed it, new features. First I added the enemy wizard sprites and printed them to the screen. I refactored the `Enemy` class method `render()` to draw the enemy sprites to the screen.

```js
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
```
Then it came time to animate CACTUS. I refactored the `Cactus` class' `render()` method and created an array to hold CACTUS' running sprites (I decided not to go with traditional sprite sheets to account for time.) I used a conditional tied to the incrementing `score` variable to create the animation logic then called `render()` in the `gameLoop`.
```js
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
```
Now that the game was working as intended, it was time to add the instructions and make it prettier! I used the color scheme generator at https://www.rapidtables.com/web/color/color-scheme.html to give the colors a cohesive look. I then made a new div to the html with the id instructions. In the script file I added an event listener to the new element and had it update the game's `secretMessage` when clicked. 
```js
const displayInstructions = () => {
    secretMessage.innerText = 'Press W to Jump \n Spare Thine Enemies!';
    secretMessage.style.display = 'block';
    setTimeout(() => {secretMessage.style.display = 'none'}, 3000)
};
```
## Deployment
All that was left to do was to merge the feature branch with the master branch and deploy to Github Pages. It's live now! Check it out: https://blangwell.github.io/cactus-the-impaler/ 

## Conclusion
This was a great project to level up my JavaScript skills. This is the first game of what I hope will be many. If you made it this far, thank you for sharing in this experience with me. I hope the game brings you a few moments of joy. All my love —Barent
