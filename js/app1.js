let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let cactus = new Image();
let enemy = new Image();

cactus.src = './assets/images/cactoos2.png';
enemy.src = './assets/images/cactoos2.png';

let gap = 50;
let cactusX = 60;
let cactusY = 100;
let gravity = 4;
let frames = 0;
// on key down'


const jump = () => {
    cactusY -= 30;
}

// enemy coordinates
let enemyArray = [];
enemyArray[0] = {
    x: canvas.width,
    y: canvas.height
}

const draw = () => {
    // frames++;
    console.log(frames);
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(cactus, cactusX, cactusY);
    let randomNumber = -(Math.floor(Math.random() * Math.floor(50)))
    // this spawns new enemies
    for (let i = 0; i < enemyArray.length; i++) {
        ctx.drawImage(enemy, enemyArray[i].x, 100);
        enemyArray[i].x -= 3;
        // this almost works!
        if (enemyArray[i].x % 507 == 0) {
            enemyArray.push({
                x: canvas.width + cactus.width,
                y: 100
            })
        }
        console.log(enemyArray);
    }
    if (cactusY < 100 && cactusY >= 30) setTimeout(()=>{cactusY += gravity}, 1000);
    
    requestAnimationFrame(draw); // this makes everything go
}

// document.addEventListener('keydown', draw);
document.addEventListener('keydown', jump)
draw();
