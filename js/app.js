let movementDisplay;
let ctx;
let game;
let cactus;
let enemy;

function Crawler(x, y, width, height, color) {// color will become sprite
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

const movementHandler = (event) => {
    console.log(event);
}

const gravityHandler = (event) => {
    console.log(event);
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('dom content loaded');
    document.addEventListener('keydown', movementHandler);
    document.addEventListener('keyup', gravityHandler);
});