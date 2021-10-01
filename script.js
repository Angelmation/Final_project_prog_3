

function setup() {
    var socket = io();
    var side = 30;
    var matrix = [];
    createCanvas(matrix[0].length * side, matrix.length * side)
    background('#acacac');
}

socket.on("weather", function (data) {
    weath = data;
})


let grassCountElement = document.getElementById('grassCount');
let grassEaterCountElement = document.getElementById('grassEaterCount');
let WildCount = document.getElementById('WildCount');
let WildeaterCount = document.getElementById('WildeaterCount');
let MegaCount = document.getElementById('MegaCount');



socket.on("data", drawCreatures);

function drawCreatures(data) {
    matrix = data.matrix;
    grassCountElement.innerText = data.grassCounter;
    grassEaterCountElement.innerText = data.grassEaterCounter;
    WildCount.innerText = data.WildCounter;
    WildeaterCount.innerText = data.WildeaterCounter;
    MegaCount.innerText = data.MegaCounter;

    console.log(data);
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                if (weath == "summer") {
                    fill("green");
                } else if (weath == "autumn") {
                    fill("#333300");
                } else if (weath == "winter") {
                    fill("white");
                } else if (weath == "spring") {
                    fill("#4dffa6");
                }
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 2) {
                fill("orange");
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 0) {
                fill('#acacac');
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 3) {
                fill('red');
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 4) {
                fill('blue');
                rect(j * side, i * side, side, side);
            } else if (matrix[i][j] == 5) {
                fill('purple');
                rect(j * side, i * side, side, side);
            }
        }
    }
}

socket.on("send matrix", drawCreatures)



function ilness() {
    socket.emit("ilness")
}

function addGrassEater() {
    socket.emit("addgrassEater")
}
