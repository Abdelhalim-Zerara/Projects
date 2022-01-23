const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


class Rectangle {
    constructor(x, width, height, speed) {
        this.x = x;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }
    calculateY() {
        this.y = canvas.height - this.height;
    }
    move(axis, speed) {
        this[axis] += speed;
    }
}


const dino = new Rectangle(0, 50, 75, 5);
dino.calculateY();
let obstacle = createNewObstacle();


function createNewObstacle() {
    const obstacle = new Rectangle(canvas.width - 50, 50, 50, -5);
    obstacle.calculateY()
    return obstacle;
}

function drawRect(rectangle, color) {
    ctx.fillStyle = color;
    ctx.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
}

function jump() {
    if (dino.y >= (canvas.height - dino.height * 2)) {
        dino.move("y", -dino.speed);
    }
}


function releaseJump() {
    if (dino.y < (canvas.height - dino.height)) {
        dino.move("y", dino.speed);
    }

}
function createScore() {
    let score = -1;
    return function () {
        score++;
        return score;
    }
}

const updateScore = createScore();

function DrawScore(score) {
    createNewObstacle()
    ctx.fillStyle = "black";
    ctx.font = 'bold 16px Arial';
    ctx.fillText(`Score ${score}`, canvas.width - 100, 50)
}


function updateGame() {
    ctx.clearRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
    drawRect(dino, "red");
    drawRect(obstacle, "blue");
    requestAnimationFrame(updateGame);
}


function addEventlistners() {
    document.body.onkeyup = function (e) {
        if (e.keyCode == 32) {
            releaseJump();
        }
    }
    document.body.onkeydown = function (e) {
        if (e.keyCode == 32) {
            jump()
        }
    }
}
window.addEventListener("load", addEventlistners);
window.addEventListener("load", updateGame);

