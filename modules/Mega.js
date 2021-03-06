var LivingCreature = require("./LivingCreature")
var random = require("./random")

module.exports = class Mega extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 6;
    }

    mul() {
        this.energy++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        console.log(emptyCells);
        if (newCell && this.energy >= 10) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = this.index;

            let newMega = new Mega(newX, newY, this.index);
            MegaArr.push(newMega);



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

            this.energy--;

            matrix[this.y][this.x - 1] = 2;
        }

        this.die();
    }

    eat() {
        let emptyCells = this.chooseCell(3, 4);
        let newCell = random(emptyCells);


        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            matrix[this.y][this.x] = 0;

            matrix[newY][newX] = this.index;

            this.x = newX;
            this.y = newY;



            for (let i in WildEaterArr) {
                if (newX === WildEaterArr[i].x && newY === WildEaterArr[i].y) {
                    WildArr.splice(i, 1);
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
            for (let i in MegaArr) {
                if (this.x == MegaArr[i].x && this.y == MegaArr[i].y) {
                    MegaArr.splice(i, 1);
                    break;
                }
            }



        }
    }


}