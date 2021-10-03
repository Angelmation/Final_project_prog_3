var socket = io();

var side = 10;
var matrix = []
// let grassCountElement = document.getElementById('grassCount');
// let grassEaterCountElement = document.getElementById('grassEaterCount');


var weath = 'summer'
function setup() {
    createCanvas(50 * side, 50 * side);
    background("#acacac");

    let grassCount = document.getElementById('grassCount');
    let grasseaterCount = document.getElementById('grassEaterCount');
    let wildCount = document.getElementById('WildCount');
    let wildeaterCount = document.getElementById('WildeaterCount');
    let megaCount = document.getElementById('MegaCount');


socket.on("weather", function (data) {
    weath = data;
})

socket.on('data', nkarel)

function nkarel(data) {
    console.log(data);
    matrix = data.matrix
    grassCount.innerText = data.grassCount;
    grasseaterCount.innerText = data.grassEaterCount;
    wildCount.innerText = data.wildCount;
    wildeaterCount.innerText = data.wildEaterCount;
   megaCount.innerText = data.megaCount;

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[0].length; x++) {
            var obj = matrix[y][x];
            if (obj == 1){
                if(weath == "summer") {
                fill("green");
            }else if (weath == "autumn") {
                fill("#333300");
            }else if (weath == "winter") {
                fill("white");
            }else if (weath == "spring") {
                fill("#4dffa6");
            }
        }else if (obj == 2) {
                fill("yellow");
            }else if (obj == 0){
                fill("grey")
            }else if(obj == 3){
                fill("red")
            }else if(obj == 4){
                fill("blue")
            }else if(obj == 5){
                fill("blueviolet")
            }

            rect(x * side, y * side, side, side);
        }
    }
}

}


function ilness() {
    socket.emit("ilness")
}
function addGrassEater() {
    socket.emit("addgrassEater")
}
