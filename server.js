
var Grass = require("./modules/Grass.js");
var Grasseater = require("./modules/Grasseater.js");
var Wild = require("./modules/Wild.js");
var WileEater = require("./modules/Wildeater.js");
var Mega = require("./modules/Mega.js");
let random = require('./modules/random');



grassArr = [];
grassEaterArr = [];
wildArr = [];
wildEaterArr = [];
megaArr = [];
matrix = [];
grassHashiv = 0;
grasseaterHashiv = 0;
wildHashiv = 0;
wildeaterHashiv = 0;
Hashiv = 0;






function matrixGenerator(matrixSize, grass, grassEater, wild, wildeater, mega) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let n = 0; n < matrixSize; n++) {
            matrix[i][n] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < wild; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < wildeater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < mega; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(20, 10, 5, 1, 1, 1);





var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);




function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            }
             else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var grass = new Wild(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var grass = new Mega(x, y);
                grassArr.push(mega);
                grassHashiv++;
            }
        }
    }
}
creatingObjects();

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }


    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv
    }


    io.sockets.emit("data", sendData);
}



setInterval(game, 3000)