     /** @type {HTMLCanvasElement} */
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 800;
    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;

    class Game {
        constructor() {
            this.enemies = [];
            this.#addNewEnemy();
            console.log(this.enemies);
        }
        updtae() {
            this.enemies.forEach(object => object.update());

        }
        draw() {
            this.enemies.forEach(object => object.draw());
        }
        #addNewEnemy() {
            this.enemies.push(new Enemy());
        }
    };

    //note if a method starts with hash# it is a private class method

    class Enemy {
        constructor() {
            this.x = 100;
            this.y = 100;
            this.width = 100;
            this.height = 100;
        }
        update() {
            this.x--;
        }
        draw() {
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };

    const game = new Game();

    let lastTime = 1;
    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        //somecode
        requestAnimationFrame(animate);
    };
    animate(0);


});

//be sure to change second argument to 'load' instead of 'DOMContentLoaded' as shown below
//document.addEventListener('DOMContentLoaded', function() { GAME }
//document.addEventListener('Load', function() {
