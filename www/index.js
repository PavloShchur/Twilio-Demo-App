let createLocalVideoTrack;
let twilioRoom;

function connect() {
    const connect = Twilio.Video.connect;

    const accessToken = document.getElementById('accessToken').value;

    connect(accessToken, {
        name : 'roomName',
        tracks : [],
        automaticSubscription : true,
        video : { height : 720, frameRate : 24, width : 1280 },
        bandwidthProfile : {
            video : {
                mode : 'presentation',
                trackSwitchOffMode : 'detected',
                maxSubscriptionBitrate : 0,
                contentPreferencesMode: 'auto'
            }
        },
        maxAudioBitrate : 16000,
        preferredVideoCodecs : 'auto',
        networkQuality : {local : 1, remote : 1}
    }).then(room => {

        console.log('Twilio JS Library Version:', Twilio.Video.version);
        console.log('Twilio room:', room);

        twilioRoom = room;

        document.getElementById('credentials').classList.add('display-none');
        document.getElementById('navigation').style.display = 'flex';

    }).catch(error => {
        console.log('init(), error:', error);
    });

    createLocalVideoTrack = Twilio.Video.createLocalVideoTrack;
}

function startScreenSharing() {

    const _canvas = document.getElementById('sharingScreen');

    const MediaStream = _canvas.captureStream();

    const videoTrack = MediaStream.getTracks()[0];
    console.log('Screen sharing video track:', videoTrack);

    const screenTrack = new Twilio.Video.LocalVideoTrack(videoTrack, {name: 'Sharing'});
    console.log('Twilio screen sharing video track:', screenTrack);

    twilioRoom.localParticipant.publishTrack(screenTrack).then(function(publication) {
        console.log('The LocalTrack "' + publication.trackName + '" was successfully published.');
        shimTrackCloneSettings(screenTrack);
    }).catch(error => {
        console.log('Screen sharing track error:', error);
    });
}

function shimTrackCloneSettings(localVideoTrack) {
    localVideoTrack._trackSender._clones.forEach(function(trackSender) {
        const track = trackSender.track;
        const initialSettings = track.getSettings();
        const actualGetSettings = track.getSettings.bind(track);
        track.getSettings = function() { return Object.assign({}, initialSettings, actualGetSettings()); };
    });
}

function turnOnVideo() {

    createLocalVideoTrack({
        name : 'Camera'
    }).then(localCameraTrack => {

        twilioRoom.localParticipant.publishTrack(localCameraTrack, {priority : 'low'}).then(function(publication) {
            console.log('The LocalTrack "' + publication.trackName + '" was successfully published.');
        }).catch(error => {
            console.log('Video track error:', error);
        });

    }).catch((error) => {
        console.log('@@@ turnOnVideo(), error:', error);
    });

    document.getElementById('turnOnCamera').classList.add('display-none');
    document.getElementById('turnOffCamera').classList.remove('display-none');
}

function turnOffVideo() {
    document.getElementById('turnOffCamera').classList.add('display-none');
    document.getElementById('turnOnCamera').classList.remove('display-none');
}