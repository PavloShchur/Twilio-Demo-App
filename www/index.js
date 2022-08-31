(function () {

    console.log('init()');

    const connect : Twilio.Video.connect;
    console.log('init(), connect:', connect);

    const createLocalAudioTrack : Twilio.Video.createLocalAudioTrack;
    const createLocalVideoTrack : Twilio.Video.createLocalVideoTrack;
    const localDataTrack : Twilio.Video.LocalDataTrack;
})();

function turnOnVideo() {
    document.getElementById('turnOnCamera').classList.add('display-none');
    document.getElementById('turnOffCamera').classList.remove('display-none');
}

function turnOffVideo() {
    document.getElementById('turnOffCamera').classList.add('display-none');
    document.getElementById('turnOnCamera').classList.remove('display-none');
}