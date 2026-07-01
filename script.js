function changeBg(bgImage) {
    document.getElementById('playroom').style.backgroundImage = `url('${bgImage}')`;
}

function clearPlayroom() {
    const playArea = document.getElementById('playroom');
    playArea.innerHTML = '';
}

const playArea = document.getElementById('playroom');
const stickers = document.querySelectorAll('.sidebar .sticker');

stickers.forEach(stickers => {
    stickers.addEventListener('dragstart', dragStart);
});

playArea.addEventListener('dragover', dragOver);
playArea.addEventListener('drop', drop);


function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const stickerId = event.dataTransfer.getData('text/plain');
    const sticker = document.getElementById(stickerId);

    if (!sticker) return;
    
    const playRect = playArea.getBoundingClientRect();
    const width = sticker.offsetWidth || 100;
    const height = sticker.offsetHeight || 100;

    let newX = event.clientX - playRect.left - (width / 2);
    let newY = event.clientY - playRect.top - (height / 2);


    if (sticker.parentNode.classList.contains('sidebar')) {
        const newSticker = sticker.cloneNode(true);
        newSticker.id = stickerId + '-' + Date.now();

        newSticker.style.position = 'absolute';
        newSticker.style.left = `${newX}px`;
        newSticker.style.top = `${newY}px`;

        newSticker.addEventListener('dblclick', function() {
            newSticker.remove();
        })

        playArea.appendChild(newSticker);

        newSticker.addEventListener('dragstart', dragStart);
    } else {
       
        sticker.style.left = `${newX}px`;
        sticker.style.top = `${newY}px`;
    }
}