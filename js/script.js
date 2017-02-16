function createPigeon() {
    var pigeon = document.createElement('div');
    pigeon.className = 'pigeon';

    pigeon.style.top = Math.floor((Math.random()*87)+1) + '%';
    pigeon.style.left = Math.floor((Math.random()*92)+1) + '%';


    document.getElementById('gameboard').appendChild(pigeon)

    pigeon.addEventListener("click", function() {
        this.style.transform = 'translateY(40em) rotate(1080deg)';
        var element = this;
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
    setTimeout(function() {
        createPigeon();
        morePigeons();

    },5000);

}

createPigeon();
movePigeon();
morePigeons();
