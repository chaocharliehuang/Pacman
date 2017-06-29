// 1 = coin
// 2 = brick
var world = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,2],
    [2,1,2,2,1,2,1,2,2,2,2,2,2,1,2,1,2,2,1,2],
    [2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,2],
    [2,1,2,1,2,2,1,2,2,0,0,2,2,1,2,2,1,2,1,2],
    [2,1,1,1,1,1,1,2,0,0,0,0,2,1,1,1,1,1,1,2],
    [2,1,2,1,2,2,1,2,2,2,2,2,2,1,2,2,1,2,1,2],
    [2,1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,2],
    [2,1,2,2,1,2,1,2,2,2,2,2,2,1,2,1,2,2,1,2],
    [2,1,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,1,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

var score = 0;

var pacman = {
    x: 1,
    y: 1
};

function displayWorld() {
    var output = '';

    for (var i = 0; i < world.length; i++) {
        output += "<div class='row'>";
        for (var j = 0; j < world[i].length; j++) {
            if (world[i][j] === 2) {
                output += "<div class='brick'></div>";
            } else if (world[i][j] === 1) {
                output += "<div class='coin'></div>";
            } else if (world[i][j] === 0) {
                output += "<div class='empty'></div>";
            }
        }
        output += "</div>";
    }
    document.getElementById('world').innerHTML = output;
}

function displayPacman() {
    document.getElementById('pacman').style.left = pacman.x*20 + "px";
    document.getElementById('pacman').style.top = pacman.y*20 + "px";
}

function displayScore() {
    document.getElementById('score').innerHTML = score;
}

displayWorld();
displayPacman();
displayScore();

document.onkeydown = function(e) {
    if (e.keyCode === 37 && world[pacman.y][pacman.x-1] !== 2) { // left
        pacman.x--;
        $('div#pacman').css('transform', 'scaleX(1)');
    } else if (e.keyCode === 39 && world[pacman.y][pacman.x+1] !== 2) { // right
        pacman.x++;
        $('div#pacman').css('transform', 'scaleX(-1)');
    } else if (e.keyCode === 38 && world[pacman.y-1][pacman.x] !== 2) { // up
        pacman.y--;
        $('div#pacman').css('transform', 'rotate(90deg)');
    } else if (e.keyCode === 40 && world[pacman.y+1][pacman.x] !== 2) { // down
        pacman.y++;
        $('div#pacman').css('transform', 'rotate(-90deg)');
    }

    // if pacman's current location is a coin, remove it and update world and score
    if (world[pacman.y][pacman.x] === 1) {
        world[pacman.y][pacman.x] = 0;
        score += 10;
        displayWorld();
        displayScore();
    }

    displayPacman();
}