// start from scratch - lets GO
let game;
let gameMessage;
let ctx;

// click to start game
// event listener on game-message
// create game message variable
gameMessage = document.getElementById('game-message')
document.addEventListener('DOMContentLoaded', () => {
    gameMessage.addEventListener('click', ()=> {
        console.log('listened!')
        // start the game animation here
    })
})

// create canvas context
// set canvas width / height
// add background to canvas
// scroll the canvas
game = document.getElementById('game-space')
console.log(canvas);
game.setAttribute('width', 480);
game.setAttribute('height', 320);
ctx = game.getContext('2d');


// enemies created and scrolled
// enemies should have an x, y, width, height, color)
// color will be replaced by src
function Enemy(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.render = function () {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// player created and moved

