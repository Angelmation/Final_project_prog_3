var LivingCreature = require("./LivingCreature")
var random = require("./random")

module.exports = class Wild extends LivingCreature{
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

            let newWild = new Wild(newX, newY, this.index);
            WildArr.push(newWild);



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



            for (let i in GrassEaterArr) {
                if (newX === GrassEaterArr[i].x && newY === GrassEaterArr[i].y) {
                    GrassArr.splice(i, 1);
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
            for (let i in WildArr) {
                if (this.x == WildArr[i].x && this.y == WildArr[i].y) {
                    WildArr.splice(i, 1);
                    break;
                }
            } 

            if (this.index == 3) {
                matrix[this.y][this.x] = 4;
            }

            if (this.index == 4) {
                matrix[this.y][this.x] = 0;
            }
        }
    }

    // getNewCoordinates() {
    //     this.directions = [
    //         [this.x - 1, this.y - 1],
    //         [this.x, this.y - 1],
    //         [this.x + 1, this.y - 1],
    //         [this.x - 1, this.y],
    //         [this.x + 1, this.y],
    //         [this.x - 1, this.y + 1],
    //         [this.x, this.y + 1],
    //         [this.x + 1, this.y + 1]
    //     ];
    // }
}
