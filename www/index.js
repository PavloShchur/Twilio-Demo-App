let createLocalVideoTrack;
let twilioRoom;

(function () {

    const connect = Twilio.Video.connect;

    connect(getAccessToken(), {
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

        twilioRoom = room;

    }).catch(error => {
        console.log('init(), error:', error);
    });

    createLocalVideoTrack = Twilio.Video.createLocalVideoTrack;
})();

function getAccessToken() {
    const header = {
        "typ": "JWT",
        "alg": "HS256",
        "cty": "twilio-fpa;v=1"
    };

    const iat = Math.round(new Date().getTime() / 1000);
    const exp = iat + 60 * 60 * 2;

    const payload = {
        "iss": "SK0c7ea848631bc5305294f53cfb862780",
        "sub": "AC03622ae23ef739369b393a24d371b165",
        "iat": iat,
        "nbf": iat,
        "exp": exp,
        "grants": {
            "identity": "identity",
            "video": {
                "room" : "test"
            }
        }
    }

    const secret = "MN72eDuuTIZsdhKUYCDqRtXCx3oR3z6M";

    const encodedHeader = base64url(CryptoJS.enc.Utf8.parse(JSON.stringify(header)));
    const encodedData = base64url(CryptoJS.enc.Utf8.parse(JSON.stringify(payload)));

    const signature = base64url(CryptoJS.HmacSHA256(encodedHeader + "." + encodedData, secret));

    return encodedHeader + '.' + encodedData + '.' + signature;
}

function base64url(source) {

    let encodedSource = CryptoJS.enc.Base64.stringify(source);

    encodedSource = encodedSource.replace(/=+$/, '');
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
}

function startScreenSharing() {

    const _canvas = document.getElementById('sharingScreen');

    const MediaStream = _canvas.captureStream();

    const videoTrack = MediaStream.getTracks()[0];

    const screenTrack = new Twilio.Video.LocalVideoTrack(videoTrack, {name: 'Sharing'});

    twilioRoom.localParticipant.publishTrack(screenTrack);
}

function turnOnVideo() {

    createLocalVideoTrack({
        name : 'Camera'
    }).then(localCameraTrack => {

        twilioRoom.localParticipant.publishTrack(localCameraTrack, {priority : 'low'});

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