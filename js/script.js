var pigeon = document.createElement('div');
pigeon.className = 'pigeon';

console.log(pigeon);
pigeon.style.top = Math.floor((Math.random()*87)+1) + '%';
pigeon.style.left = Math.floor((Math.random()*92)+1) + '%';

console.log(Math.floor((Math.random()*87)+1));

document.getElementById('gameboard').appendChild(pigeon)
