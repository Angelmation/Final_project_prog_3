class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];


    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }

            }
        }
        return found;
    }

    mul() {
        this.multiply++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        console.log(emptyCells);
        if (newCell && this.multiply >= 8) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = this.index;

            let newGrass = new Grass(newX, newY, this.index);
            grassArr.push(newGrass);
            this.multiply = 0;
        }

    }




}

class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.directions = [];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] === character) {
                    found.push(this.directions[i]);
                }

            }
        }
        return found;
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

            this.energy-=4;
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
           /* matrix[this.y][this.x] = 0;
            for (let i in grassEaterArr) {
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }*/

            if(this.index == 2){
                this.index = 5;
            }

            if(this.index == 5){
                this.index = 0;
            }
        }
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


}


class Wild {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 4;
        this.index = index;
        this.directions = [];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] === character) {
                    found.push(this.directions[i]);
                }

            }
        }
        return found;
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
            wildArr.push(newWild);



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



            for (let i in grassEaterArr) {
                if (newX === grassEaterArr[i].x && newY === grassEaterArr[i].y) {
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
            /* matrix[this.y][this.x] = 0;
            for (let i in wildArr) {
                if (this.x == wildArr[i].x && this.y == wildArr[i].y) {
                    wildArr.splice(i, 1);
                    break;
                }
            } */

            if(this.index == 3){
               matrix[this.y][this.x] = 4;
            }

            if(this.index == 4){
                matrix[this.y][this.x]=0;
            }
        }
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
}




class WildEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 4;
        this.index = index;
        this.directions = [];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] === character) {
                    found.push(this.directions[i]);
                }

            }
        }
        return found;
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
            wildEaterArr.push(newWildEater);



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

            matrix[this.y][this.x-1] = 1;

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



            for (let i in wildArr) {
                if (newX === wildArr[i].x && newY === wildArr[i].y) {
                    grassEaterArr.splice(i, 1);
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
             /*matrix[this.y][this.x] = 0;
            for (let i in wildEaterArr) {
                if (this.x == wildEaterArr[i].x && this.y == wildEaterArr[i].y) {
                    wildEaterArr.splice(i, 1);
                    break;
                }
            } */

          
            if(this.index == 4){
                matrix[this.y][this.x] = 1;
             }
 
             if(this.index == 1){
                 matrix[this.y][this.x]=0;
             }
        }
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
}



 

class Mega {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.index = index;
        this.directions = [];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] === character) {
                    found.push(this.directions[i]);
                }

            }
        }
        return found;
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
            megaArr.push(newMega);



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

            matrix[this.y][this.x-1] = 2;
        }

        this.die();
    }

    eat() {
        let emptyCells = this.chooseCell(3,4);
        let newCell = random(emptyCells);


        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];

            matrix[this.y][this.x] = 0;

            matrix[newY][newX] = this.index;

            this.x = newX;
            this.y = newY;



            for (let i in wildEaterArr) {
                if (newX === wildEaterArr[i].x && newY === wildEaterArr[i].y) {
                    wildArr.splice(i, 1);
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
            for (let i in megaArr) {
                if (this.x == megaArr[i].x && this.y == megaArr[i].y) {
                    megaArr.splice(i, 1);
                    break;
                }
            } 

            
            
        }
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
}