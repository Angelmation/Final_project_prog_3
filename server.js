
var Grass = require("./modules/Grass.js");
var Grasseater = require("./modules/Grasseater.js");
var Wild = require("./modules/Wild.js");
var WildEater = require("./modules/Wildeater.js");
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
megaHashiv = 0;
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
matrixGenerator(20, 10, 5, 3, 2, 2);





var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
const GrassEater = require("./modules/Grasseater.js");
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

var n = 50;

weath = "winter";
Grass = require("./Grass")
GrassEater = require("./GrassEater")

function rand(min, max) {
    return Math.random() * (max - min) + min;
}

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 3))

    }
}

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new Grasseater(x, y);
                grassEaterArr.push(grassEater);
                grasseaterHashiv++;
            }
            else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            }
            else if (matrix[y][x] == 3) {
                var grass = new Wild(x, y);
                wildArr.push(Wild);
                wildHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var grass = new WildEater(x, y);
                wildEaterArr.push(WildEater);
                wildeaterHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var grass = new Mega(x, y);
                megaArr.push(mega);
                megaHashiv++;
            }
        }
    }

    io.sockets.emit("send matrix", matrix)
}

creatingObjects();

function game() {

    for (var i in grassArr) {
        grassArr[i].mul();
    }


    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }


    for (var i in wildArr) {
        wildrArr[i].eat();
    }


    for (var i in wildEaterArr) {
        wildEaterArr[i].eat();
    }


    for (var i in megaArr) {
        megaArr[i].eat();
    }
}

setInterval(game, 3000)

function ilness() {
    grassEaterArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2)
                matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addGrassEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);


let sendData = {
    matrix: matrix,
    grassCounter: grassHashiv,
    grasseatercounter: grasseaterHashiv,
    wildcount: wildHashiv,
    wildeatercounter: wildeaterHashiv,
    mega: megaHashiv
}


io.sockets.emit("data", sendData);


io.on('connection', function (socket) {
    createObject();
    socket.on("ilness", ilness);
    socket.on("add grassEater", addGrassEater);
});


var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        console.log("send")
    })
}, 1000)


