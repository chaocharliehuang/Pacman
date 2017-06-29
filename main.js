// 1 = coin
// 2 = brick
// 3 = cherry
var world = [
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
    [2,0,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,3,2],
    [2,1,2,2,1,2,1,2,2,2,2,2,2,1,2,1,2,2,1,2],
    [2,1,2,1,1,1,3,1,1,1,1,1,1,1,1,1,1,2,1,2],
    [2,1,2,1,2,2,1,2,2,0,0,2,2,1,2,2,1,2,1,2],
    [2,1,1,1,1,1,1,2,0,0,0,0,2,1,1,1,1,1,1,2],
    [2,1,2,1,2,2,1,2,2,2,2,2,2,1,2,2,1,2,1,2],
    [2,1,2,1,1,1,1,1,1,1,1,1,1,3,1,1,1,2,1,2],
    [2,1,2,2,1,2,1,2,2,2,2,2,2,1,2,1,2,2,1,2],
    [2,3,1,1,1,2,1,1,1,1,1,1,1,1,2,1,1,1,3,2],
    [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

var score = 0;

var lives = 1;

var cherries = 5;

var pacman = {
    x: 1,
    y: 1
};

var ghost = {
    x: 9,
    y: 5
}

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
            } else if (world[i][j] === 3) {
                output += "<div class='cherry'></div>";
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

function displayGhost() {
    document.getElementById('ghost').style.left = ghost.x*20 + "px";
    document.getElementById('ghost').style.top = ghost.y*20 + "px";
}

function displayScore() {
    document.getElementById('score').innerHTML = "Score: " + score;
}

function displayLives() {
    document.getElementById('lives').innerHTML = "Lives: " + lives;
}

displayWorld();
displayPacman();
displayGhost();
displayScore();
displayLives();

document.onkeydown = function(e) {
    if (score < 0 || lives === 0) {
        return null;
    }

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

    // if pacman's current location is not a brick or empty
    if (world[pacman.y][pacman.x] !== 2 || world[pacman.y][pacman.x] !== 0) {
        if (world[pacman.y][pacman.x] === 1) { // coin
            score += 10;
            $('#score').css('color','white');
        } else if (world[pacman.y][pacman.x] === 3) { // cherry
            score += 50;
            $('#score').css('color','lime');
            cherries--;
        }
        world[pacman.y][pacman.x] = 0;
        displayWorld();
        displayScore();
    }
    displayPacman();
}

function gameLoop() {
    if (pacman.x === ghost.x && pacman.y === ghost.y) {
        score -= 50;
        $('#score').css('color','red');
        lives -= 1;
        pacman.x = 1;
        pacman.y = 1;
        displayScore();
        displayLives();
        displayPacman();
    }

    if (lives === 0 || score < 0 || cherries === 0) {
        endGame();
    }

}

function endGame() {
    $('#world').html('');
    $('#pacman, #ghost').css('display','none');
    if (lives === 0 || score < 0) {
        $('#game-over').html('<p>You lost :(</p><a href="./index.html">Play again</a>');
    } else if (cherries === 0) {
        $('#game-over').html('<p>You won! :D</p><a href="./index.html">Play again</a>');
    }
    clearInterval(startGame);
}

var startGame = setInterval(gameLoop, 100);
