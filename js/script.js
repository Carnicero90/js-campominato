// MISC
const totSquares = 100;
const totBombs = 16
var scores = [
    ['aldo', 1],
    ['chapo', 27],
    ['calavera', 4]
];

// HTML ELEMENTS

// minefield
var mineField = document.getElementById('mine-field');

//post-game interface
var ranks = document.getElementById('score-board');
var finalScore = document.getElementById('final-score');
var replay = document.getElementById('play-again');
var boh = document.getElementById('scores');

// PLAY

playGame();

// RESET PLAYGROUND
replay.addEventListener("click", function() {
    playGame();
})

function playGame() {
    var score = 0;
    var gameOver = false;

    setPlayGround();

    var squares = document.getElementsByClassName('square');

    for (var i = 0; i < squares.length; i++) {
        const item = squares[i];
        item.addEventListener('click', function() {
            if (!gameOver) {
                if (item.classList.contains('bomb')) {
                    document.getElementById('explode').classList.remove('nada');
                    setTimeout(function() {
                        endGame(resultMessage = 'hai perso!');
                        document.getElementById('explode').classList.add('nada');
                        gameOver = true;
                    }, 1500)

                } else if (item.classList.contains('hidden')) {
                    item.classList.remove('hidden');
                    score += 1;
                    if (score == totSquares - totBombs) {
                        endGame(resultMessage = 'hai vinto!');
                        gameOver = true;
                    }
                }
            }
        })
    }

    function setPlayGround() {
        // CREATE AND DISPLAY MINEFIELD
        mineField.innerHTML = '<div class="square hidden"></div>'.repeat(totSquares);
        // CREATE BOMBS
        var counter = 0;
        var b = [];
        while (counter < totBombs) {
            bombIndex = getRandomInt(0, totSquares)
            if (!b.includes(bombIndex)) {
                b.push(bombIndex);
                document.getElementsByClassName('square')[bombIndex].classList.add('bomb');
                counter++;
            }
        }

        // HIDE POST-GAME INTERFACE
        ranks.classList.add('nada');
    }



    function endGame(resultMessage) {
        alert(resultMessage);
        finalScore.innerHTML = `il tuo punteggio è ${score}`;
        var userName = prompt('username') || `player_${getRandomInt(1,100)}`;
        scores.push([userName, score]);
        sortScore(scores);
        ranks.classList.remove('nada');
        var rankList = '<li>' + scores.join('</span></li><li>').replaceAll(',', ': <span>') + '</li>';
        document.getElementById('scores').innerHTML = rankList;
        for (el of document.getElementsByClassName('bomb')) {
            el.classList.remove('hidden');
        }
    }

}


function sortScore(arr) {
    // sort arr by arr[i][1] value (reversed)
    // arr == Array
    arr.sort(function(a, b) {
        return a[1] - b[1];
    });
    return arr.reverse();
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
}