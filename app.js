     /** @type {HTMLCanvasElement} */
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 800;
    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;

    class Game {
        constructor(ctx, width, height) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.enemies = [];
            //this.#addNewEnemy();
            this.enemyInterval = 1000; //will add new enmey every 400milliseconds
            this.enemyTimer = 0; //will count to 400milliseconds over and over
        }
        update(deltaTime) {
            //this.enemies = this.enemies.filter(object => !object.markedForDeletion); this code can be put here but it will be more cpu intensive, by placing it inside the if statement below you can boost performance as it will only run the filter method when an enemy is added ^.^
            if (this.enemyTimer > this.enemyInterval) {
                this.#addNewEnemy();
                this.enemyTimer = 0;
                this.enemies = this.enemies.filter(object => !object.markedForDeletion);
            } else {
                this.enemyTimer += deltaTime;
            } //all logic for adding new enemeies every 400milliseconds
            this.enemies.forEach(object => object.update());
        }
        draw() {
            this.enemies.forEach(object => object.draw(this.ctx));
        }
        #addNewEnemy() {
            this.enemies.push(new Enemy(this));
        }
    };

    //note if a method starts with hash# it is a private class method

    class Enemy {
        constructor(game) {
            this.game = game;
            this.x = this.game.width;
            this.y = Math.random() * this.game.height; //enemy spawn location is randomly chosen => somewhere on the canvas.height between 0 and 800px
            this.width = 100;
            this.height = 100;
            this.markedForDeletion = false;
        }
        update() {
            this.x--;
            if (this.x < 0 - this.width) this.markedForDeletion = true;
        }
        draw(ctx) {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };

    const game = new Game(ctx, canvas.width, canvas.height);
    let lastTime = 1;
    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        game.update(deltaTime);
        game.draw();
        requestAnimationFrame(animate);
    };
    animate(0);


});

/*
**NOTES**
be sure to change second argument to 'load' instead of 'DOMContentLoaded' as shown below
document.addEventListener('DOMContentLoaded', function() { GAME }
document.addEventListener('Load', function() {
say you have Arrays of obstacles, game items, power ups, etc. designing your game using a wrapper
function allows you to easily get up and running with your new browser games, by wrapper function
I mean the update() and draw() methods used within the Game object
best practice is to NOT use global variables inside of your classes! adding the 'ctx' 'width' and 'height'
variables as parameters to your game class keeps your variables private! you can then access the variables like this: const game = new Game(ctx, canvas.width, canvas.height)
converting global variables into class properties as shown in the Game() class allows you to SAFELY pass around variables within your program!
by passing the keyword 'this' as a parameter to your private method #addNewEnemy(this) you are able to access all properties within the Game() class object using the enemy class
adding deltaTime and logic to your Game class update() method provides a similar experience to all users regardless of the machine that runs your game, look into deltaTime you wont regret it!
look into 'object pooling' for memory management so that your game doesnt overload itseld with memory from running too long for this game we will use a different method filtering an array using the this.markedForDeletion property in the enemy class we will be able to remove all objects in the array if this properties boolean value equals true
using this logical statement in the enemy class update method checks to see if the object has already gone accross the screen and if so the enemey objects markedForDeletion property is set to true so it can be deleted  if (this.x < 0 - this.width) this.markedForDeletion = true;

*/
