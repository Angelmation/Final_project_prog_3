var LivingCreature = require("./LivingCreature")
var random = require("./random")

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
    }

    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    // eat, mul, move, die


    mul() {
        this.energy++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        console.log(emptyCells);
        if (newCell && this.energy >= 12) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = this.index;

            let newGrassEater = new GrassEater(newX, newY, this.index);
            grassEaterArr.push(newGrassEater);


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

            this.energy -= 4;
        }

        this.die();
    }

    eat() {
        let emptyCells = this.chooseCell(1);
        let newCell = random(emptyCells);


        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            matrix[this.y][this.x] = 0;

            matrix[newY][newX] = this.index;

            this.x = newX;
            this.y = newY;



            for (let i in grassArr) {
                if (newX === grassArr[i].x && newY === grassArr[i].y) {
                    grassArr.splice(i, 1);
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
            for (let i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }

            if (this.index == 2) {
                this.index = 5;
            }

            if (this.index == 5) {
                this.index = 0;
            }
        }
    }

}