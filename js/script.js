var score = 0;

function createPigeon() {
    var pigeon = document.createElement('div');
    pigeon.className = 'pigeon';

    pigeon.style.top = Math.floor((Math.random()*87)+1) + '%';
    pigeon.style.left = Math.floor((Math.random()*92)+1) + '%';


    document.getElementById('gameboard').appendChild(pigeon)

    pigeon.addEventListener("click", function() {
        this.style.transform = 'translateY(40em) rotate(1080deg)';
        var element = this;
        updateScore(150);
        setTimeout(function() {
            element.parentNode.removeChild(element);
        }, 1000);
    });
}

function movePigeon() {
    setTimeout(function() {
        var pigeons = document.getElementsByClassName('pigeon');
        for (var i = 0; i < pigeons.length; i++) {
            pigeons[i].style.top = Math.floor((Math.random()*87)+1) + '%';
            pigeons[i].style.left = Math.floor((Math.random()*92)+1) + '%';
        }
        movePigeon();
    }, 1000);
}

function morePigeons() {
    var nbPigeon = document.getElementsByClassName('pigeon').length;
    if (nbPigeon < 15) {
        setTimeout(function() {
            createPigeon();
            morePigeons();

        }, 3000 - score/5);  
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

document.getElementById('gameboard').addEventListener('click', function() {
    updateScore(-50);
});


createPigeon();
movePigeon();
morePigeons();
