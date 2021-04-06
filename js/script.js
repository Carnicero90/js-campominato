// NB: ancora fatto coi piedi, da riordinare, fattorizzare, etc

const totSquares = 100;
var totBombs = 16;
var score = 0;

/* uso array a 2 lv per semplicità, per quanto poi realisticamente in situazioni simili utilizzeremo strutture meno "involute": 
    scores[i][0] --> username 
    scores[i][1] --> score 
*/
var scores = [
    ['aldo', 1],
    ['chapo', 52]
];

//CREATE PLAYGROUND
document.getElementById('mine-field').innerHTML = '<div class="square hidden"></div>'.repeat(totSquares);

var field = arrayFromRange(1, totSquares);
// CHOOSE GAME MODE
switch (prompt('scegliere lv difficoltà:\n a) facile\n b) medio\n c) difficile')) {
    case 'a':
        totBombs = 5;
        break;
    case 'b':
        totBombs = 10;
        break;
    default:
        totBombs = 16;
}

// ADD BOMBS TO EITHER bombsArr AND PLAYGROUND 
var bombsArr = [];
var bombSquare = -1;
for (var i = 0; i < totBombs; i++) {
    bombSquare = field[Math.floor(Math.random() * field.length)];
    bombsArr.push(bombSquare);
    field = removeItem(bombSquare, field);
    document.getElementsByClassName('square')[bombSquare - 1].innerHTML = '*';
    document.getElementsByClassName('square')[bombSquare - 1].classList.add('bomb');
}


// var gameEnded = false; // flag: if lost --> game is over
var check = document.getElementById('check');

check.addEventListener("click", function() {

    // if (!gameEnded) {
    var guess = parseInt(document.getElementById('user-number').value);

    if (field.includes(guess)) {
        score += 1;
        document.getElementsByClassName('square')[guess - 1].classList.remove('hidden');
        field = removeItem(guess, field);
    } else if (bombsArr.includes(guess)) {
        // gameEnded = true;
        var greetOrGrieve = field.length ? 'hai perso!' : 'hai vinto!';
        alert(greetOrGrieve);
        document.getElementById('ingame-stuff').classList.add('nada');
        document.getElementById('final-score').innerHTML = `il tuo punteggio è ${score}`;
        var userName = prompt('username');
        scores.push([userName, score]);
        sortScore(scores);
        document.getElementById('blabla').classList.remove('nada');
        for (el of document.getElementsByClassName('bomb')) {
            el.classList.remove('hidden');
        }
        var scoreList = document.getElementById('scores').innerHTML;
        for (i of scores) {
            document.getElementById('scores').innerHTML += `<li>${i[0]}: ${i[1]}`;
        }
    } else {
        alert('numero inserito non valido!');
    }
    // }
})


function removeItem(value, arr) {
    // arr == Array
    // value == value to remove from arr
    arr = arr.filter(item => item !== value);
    return arr
}

function arrayFromRange(start, stop, step = 1) {
    // return Array from start to stop (included), with step == step
    // start, stop, step == integers
    arr = Array.from({
        length: (stop - start) / step + 1
    }, (_, i) => start + (i * step));
    return arr
}

function sortScore(arr) {
    // sort arr by arr[i][1] value (reversed)
    // arr == Array
    arr.sort(function(a, b) {
        return a[1] - b[1];
    });
    return arr.reverse();
}