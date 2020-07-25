let movementDisplay;
let ctx;
let game;
let cactus;
let enemy;

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