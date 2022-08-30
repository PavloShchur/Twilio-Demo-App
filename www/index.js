function turnOnVideo() {
    document.getElementById('turnOnCamera').classList.add('display-none');
    document.getElementById('turnOffCamera').classList.remove('display-none');
}

function turnOffVideo() {
    document.getElementById('turnOffCamera').classList.add('display-none');
    document.getElementById('turnOnCamera').classList.remove('display-none');
}