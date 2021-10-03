var LivingCreature = require("./LivingCreature")
var random = require("./random")

module.exports = class WildEater extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 4;

    }

    mul() {
        this.energy++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        console.log(emptyCells);
        if (newCell && this.energy >= 12) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = this.index;

            let newWildEater = new WildEater(newX, newY, this.index);
            WildEaterArr.push(newWildEater);



        }
    }




    move() {

        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);


        if (newCell) {

            let newX = newCell[0];
            let newY = newCell[1];

            matrix[this.y][this.x] = 0;

            matrix[newY][newX] = this.index;

            this.x = newX;
            this.y = newY;

            matrix[this.y][this.x - 1] = 1;

            this.energy--;


        }

        this.die();
    }

    eat() {
        let emptyCells = this.chooseCell(2);
        let newCell = random(emptyCells);


        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            matrix[this.y][this.x] = 0;

            matrix[newY][newX] = this.index;

            this.x = newX;
            this.y = newY;



            for (let i in WildArr) {
                if (newX === WildArr[i].x && newY === WildArr[i].y) {
                    GrassEaterArr.splice(i, 1);
                    break;
                }

            }

            this.energy++;
            this.mul();

        }



        else {
            this.move();
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
           for (let i in WildEaterArr) {
               if (this.x == WildEaterArr[i].x && this.y == WildEaterArr[i].y) {
                   WildEaterArr.splice(i, 1);
                   break;
               }
           } 


            if (this.index == 4) {
                matrix[this.y][this.x] = 1;
            }

            if (this.index == 1) {
                matrix[this.y][this.x] = 0;
            }
        }
    }

}


