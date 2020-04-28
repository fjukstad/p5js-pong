class Player {

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.speed = 10;
        this.points = 0;
    }

    draw() {
        rect(this.x, this.y, this.width, this.height);
    }

    moveDown() {
        this.y = this.y + this.speed;
    }

    moveUp() {
        this.y = this.y - this.speed;
    }

    setY(y) {
        this.y = y;
    }

    givePoint() {
        this.points = this.points + 1;
    }
}

class Ball {

    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speedX = 3;
        this.speedY = 2.2;
    }

    move() {
        if (this.y >= height - this.radius) {
            this.speedY = this.speedY * -1;
        }

        if (this.y <= 0 + this.radius) {
            this.speedY = this.speedY * -1;
        }

        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;

    }

    moveTo(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        ellipse(this.x, this.y, this.radius);
    }

    checkCollision(player) {
        // check collision detection with the p5.collide2d.js library 

        let hit = collideRectCircle(player.x, player.y, player.width,
            player.height, this.x, this.y, this.radius);

        if (hit) {
            this.speedX = this.speedX * -1;
        }


    }

}

var p1, p2, b;

function setup() {
    createCanvas(800, 500);

    p1 = new Player(30, 50, 30, 100);
    p2 = new Player(width - 60, 50, 30, 100);
    b = new Ball(width / 2, height / 2, 20, 20);
}


function draw() {

    background(0);
    fill(255);

    // Movement, collision detection and drawing 
    b.move();
    b.checkCollision(p1);
    b.checkCollision(p2);
    b.draw();

    p1.draw();
    p2.draw();

    // Movement of players 
    if (keyIsDown(UP_ARROW)) {
        p1.moveUp();
    } else if (keyIsDown(DOWN_ARROW)) {
        p1.moveDown();
    }
    p2.setY(mouseY);


    // Check if ball is out of bounds and give points 
    if (b.x < 0) {
        p2.givePoint();
        b.moveTo(width / 2, height / 2);
    } else if (b.x > width) {
        p1.givePoint();
        b.moveTo(width / 2, height / 2);
    }

    // Write out score 
    score = p1.points + " - " + p2.points;
    text(score, width / 2, 50);

}