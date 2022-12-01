document.addEventListener('load', function() {
        /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 800;
    //canvas.width = window.innerWidth;
    //canvas.height = window.innerHeight;

    class Game {
        constructor() {
            this.enemies = [];
        }
        updtae() {

        }
        draw() {

        }
        #addNewEnemy() {

        }
    }

    //note if a method starts with hash# it is a private class method

    class Enemy {
        constructor() {

        }
        update() {

        }
        draw() {

        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas,width, canvas.height);

        requestAnimationFrame(animate);
    }


});
