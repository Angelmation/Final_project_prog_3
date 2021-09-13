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

