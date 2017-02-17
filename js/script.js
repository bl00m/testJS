function createPigeon() {
    var pigeon = document.createElement('div');
    pigeon.className = 'pigeon';
    pigeon.style.top = Math.floor((Math.random()*87)+1) + '%';
    pigeon.style.left = Math.floor((Math.random()*92)+1) + '%';
    document.getElementsByTagName('main')[0].appendChild(pigeon)
}

function morePigeons() {
    var nbPigeon = document.getElementsByClassName('pigeon').length;
    if (nbPigeon < 15) {
        setTimeout(function() {
            createPigeon();
            morePigeons();

        }, 2000 - score/10);

    } else {
        alert('Game Over');
        document.getElementsByTagName('main')[0].innerHTML = '';
        updateScore(0 - score);
        morePigeons();
    }
}

function updateScore(num) {
    score += num;
    document.getElementById('score').innerHTML = score;
}

function updateCombo(touche) {
    if (!bazooka) {
        if (comboCount > 4) {
            document.getElementById('combo').innerHTML = 'Bazooka unlocked !';
            comboCount = 0;
            launchBazooka();
        } else if (touche) {
            comboCount++;
            document.getElementById('combo').innerHTML = comboCount;
        } else {
            comboCount = 0;
            document.getElementById('combo').innerHTML = comboCount;
        }
    }
}

function launchBazooka() {
    console.log('BAAAZOOOKA');
    bazooka = true;
    updateCombo(0);
    document.getElementsByTagName('main')[0].id = 'cursorBazooka';
    bazookaShot = 6;
    // setTimeout(function () {
    //     bazooka = false;
    //     document.getElementsByTagName('main')[0].id = 'cursorStandart';
    //     document.getElementById('combo').innerHTML = comboCount;
    // }, 10000);
}

var score = 0;
var bazooka = false;
var comboCount = 0;
var bazookaShot = 6;

document.getElementsByTagName('main')[0].addEventListener('click', function(event) {
    if (!bazooka) {
        var pigeons = document.getElementsByClassName('pigeon');

        var touche = false;
        for (var i=0; i<pigeons.length; i++) {
            pigeonPos = pigeons[i].getBoundingClientRect();

            if (event.clientX > pigeonPos.left && event.clientX < pigeonPos.left + 128 && event.clientY > pigeonPos.top && event.clientY < pigeonPos.top + 128) {
                pigeons[i].className = 'deadpigeon';
                touche = true;
                updateScore(100);
                updateCombo(touche);
            }
        }
        if (!touche) {
            updateScore(-50);
            updateCombo(touche);
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

        bazookaShot--;
        if (bazookaShot < 1) {
            bazooka = false;
            document.getElementsByTagName('main')[0].id = 'cursorStandart';
            document.getElementById('combo').innerHTML = comboCount;
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
