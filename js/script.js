function createPigeon() {
    var pigeon = document.createElement('div');
    pigeon.className = 'pigeon';
    pigeon.style.top = Math.floor((Math.random()*87)+1) + '%';
    pigeon.style.left = Math.floor((Math.random()*92)+1) + '%';
    document.getElementById('gameboard').appendChild(pigeon)
}

function morePigeons() {
    var nbPigeon = document.getElementsByClassName('pigeon').length;
    if (nbPigeon < 15) {
        setTimeout(function() {
            createPigeon();
            morePigeons();

        }, 2000 - score/5);
        
    } else {
        alert('Game Over');
        document.getElementById('gameboard').innerHTML = '';
        updateScore(0 - score);
        morePigeons();
    }
}

function updateScore(num) {
    score += num;
    document.getElementById('score').innerHTML = score;
}

function launchBazooka() {
    console.log('BAAAZOOOKA');
    bazooka = true;
    comboCount = 0;
    setTimeout(function () {
        bazooka = false;
    }, 10000);
}

var score = 0;
var bazooka = false;
var comboCount = 0;

document.getElementById('gameboard').addEventListener('click', function(event) {
    if (!bazooka) {
        var pigeons = document.getElementsByClassName('pigeon');

        var touche = false;
        for (var i=0; i<pigeons.length; i++) {
            pigeonPos = pigeons[i].getBoundingClientRect();

            if (event.clientX > pigeonPos.left && event.clientX < pigeonPos.left + 100 && event.clientY > pigeonPos.top && event.clientY < pigeonPos.top + 92) {
                pigeons[i].className = 'deadpigeon';
                updateScore(100);
                if (comboCount > 4) {
                    launchBazooka();
                } else {
                    comboCount++;
                }
                touche = true;
            }
        }

        if (!touche) {
            updateScore(-50);
            comboCount = 0;
        }

    } else {
        var pigeons = document.getElementsByClassName('pigeon');

        for (var i=pigeons.length-1; i>=0; i--) {
            pigeonPos = pigeons[i].getBoundingClientRect();

            if (Math.abs(event.clientX - pigeonPos.left) < 200) {
                if (Math.abs(event.clientY - pigeonPos.top) < 200) {
                    pigeons[i].className = 'deadpigeon';
                    updateScore(100);
                }
            }
        }
    }
});

setInterval(function() {
    var pigeons = document.getElementsByClassName('pigeon');
    for (var i = 0; i < pigeons.length; i++) {
        pigeons[i].style.top = Math.floor((Math.random()*87)+1) + '%';
        pigeons[i].style.left = Math.floor((Math.random()*92)+1) + '%';
    }
}, 1000);

setInterval(function() {
    var pigeons = document.getElementsByClassName('deadpigeon');
    for (var i = 0; i < pigeons.length; i++) {
        pigeons[i].parentNode.removeChild(pigeons[i]);
    }
}, 10000);

createPigeon();
morePigeons();
