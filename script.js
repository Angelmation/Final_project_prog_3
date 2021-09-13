var matrix = [];

function matrixGen(matY, matX, grass, grassEat, gazan, gazanaker, mega) {
    for (let i = 0; i < matY; i++) {
        matrix[i] = [];
        for (let j = 0; j < matX; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {

        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
        }
    }
    for (let i = 0; i < grassEat; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
        }
    }
    for (let i = 0; i < gazan; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }
    }


    for (let i = 0; i < gazanaker; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        }
    }


    for (let i = 0; i < mega; i++) {
        var y = Math.floor(Math.random() * matY)
        var x = Math.floor(Math.random() * matX)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
        }
    }
}

matrixGen(40, 40, 1500, 100, 50, 15, 5);

var grassArr = [];
var grassEaterArr = [];
var wildArr = [];
var wildEaterArr = [];
var megaArr = [];
var side = 15;


function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
    background('#acacac');




    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] === 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] === 2) {
                var ge = new GrassEater(x, y, 2);
                grassEaterArr.push(ge);
            }
            else if (matrix[y][x] === 3) {
                var wi = new Wild(x, y, 3);
                wildArr.push(wi);
            }

            else if (matrix[y][x] === 4) {
                var we = new WildEater(x, y, 4);
                wildEaterArr.push(we);
            }

            else if (matrix[y][x] === 5) {
                var me = new Mega(x, y, 5);
                megaArr.push(me);
            }
        }

    }
}



function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }

            if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }

            if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }

            if (matrix[y][x] == 4) {
                fill("purple");
                rect(x * side, y * side, side, side);
            }

            if (matrix[y][x] == 5) {
                fill("blue");
                rect(x * side, y * side, side, side);
            }

            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
        }
    }


    for (var i in grassArr) {
        grassArr[i].mul();
    }




    for (var i in grassEaterArr) {

        grassEaterArr[i].eat();

    }

    for (var i in wildArr) {

        wildArr[i].eat();

    }

    for (var i in wildEaterArr) {

        wildEaterArr[i].eat();

    }

    for (var i in megaArr) {

        megaArr[i].eat();

    }
}





