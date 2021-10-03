var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");


app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

GrassArr = [];
GrassEaterArr = [];
WildArr = [];
WildEaterArr = [];
MegaArr = [];
matrix = [];

var n = 50;

weath = "winter";
Grass = require('./modules/Grass');
GrassEater = require('./modules/Grasseater');
Wild = require('./modules/Wild');
Wildeater = require('./modules/Wildeater');
Mega = require('./modules/Mega');

function rand(min, max) {
    return Math.random() * (max - min + 1) + min;
}

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 5))

    }
}

io.sockets.emit("send matrix", matrix)



function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = 1
                GrassArr.push(new Grass(x, y, 1))
            }
            else if (matrix[y][x] == 2) {
                matrix[y][x] = 2
                GrassEaterArr.push(new GrassEater(x, y, 2))
            }
            else if (matrix[y][x] == 3) {
                matrix[y][y] == 3
                WildArr.push(new Wild(x, y, 3))
            }
            else if (matrix[y][x] == 4) {
                matrix[y][y] == 4
               WildEaterArr.push(new Wildeater(x, y, 4))
            }
            else if (matrix[y][x] == 5) {
                matrix[y][y] == 5
                MegaArr.push(new Mega(x, y, 5))
            }

        }
    }
}

function game() {
    for (var i = 0; i < GrassArr; i++) {
        GrassArr[i].mul()
    }
    for (var i = 0; i < GrassEaterArr; i++) {
        GrassEaterArr[i].eat();
    }
    for (var i = 0; i < WildArr; i++) {
        WildArr[i].eat();
    }
    for (var i in WildEaterArr) {
        WildEaterArr[i].eat();
    }
    for (var i in MegaArr) {
        MegaArr[i].eat();
    }
    dataSend = {
        matrix: matrix,
        grassCount: GrassArr.length,
        grassEaterCount: GrassEaterArr.length,
        wildCount: WildArr.length,
        wildEaterCount: WildEaterArr.length,
        megaCount: MegaArr.length,

    }
    io.sockets.emit("data", dataSend);
}

setInterval(game, 3000)


function kill() {
    GrassEaterArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if(matrix[y][x]==2)
            matrix[y][x] = 0;
        }
    }
}

function ilness() {
    GrassEaterArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if(matrix[y][x]==2){
            matrix[y][x] = 0;
        }
    }
    }
}

function addGrassEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0 / matrix[y][x] == 1 ) {
            matrix[y][x] = 2
            GrassEaterArr.push(new GrassEater(x, y, 2))
        }
    }
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


////

io.on('connection', function (socket) {
    createObject();
    socket.on("ilness", ilness);
    socket.on("addgrassEater", addGrassEater);

});


var statistics = {};

setInterval(function () {
    statistics.Grass = GrassArr.length;
    statistics.Grasseater = GrassEaterArr.length;
    statistics.Wild = WildArr.length;
    statistics.Wildeater = WildEaterArr.length;
    statistics.Mega = MegaArr.length;

    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        console.log("send")
    })
}, 1000)