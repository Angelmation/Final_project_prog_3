var socket = io();
var side = 30;

function setup() {
    var matrix = [];

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

        createCanvas(matrix[0].length * side, matrix.length * side)

        background('#acacac');

        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill("green");
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
}

socket.on("weather", function (data) {
    weath = data;
})

        socket.on('send matrix',drawCreatures )
 


function ilness() {
    socket.emit("ilness")
}

function gea() {
    socket.emit("addgrasseater")
}
