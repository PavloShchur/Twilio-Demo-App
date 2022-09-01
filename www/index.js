let createLocalVideoTrack;
let twilioRoom;

function connect() {
    const connect = Twilio.Video.connect;

    const sid = document.getElementById('SID').value;
    const apiKey = document.getElementById('APIKey').value;
    const apiSecret = document.getElementById('APISecret').value;

    connect(getAccessToken(sid, apiKey, apiSecret), {
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

function getAccessToken(sid, apiKey, apiSecret) {
    const header = {
        "typ": "JWT",
        "alg": "HS256",
        "cty": "twilio-fpa;v=1"
    };

    const iat = Math.round(new Date().getTime() / 1000);
    const exp = iat + 60 * 60 * 2;

    const payload = {
        "sub": sid,
        "iss": apiKey,
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

    const secret = apiSecret;

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
    console.log('Screen sharing video track:', videoTrack);

    const screenTrack = new Twilio.Video.LocalVideoTrack(videoTrack, {name: 'Sharing'});
    console.log('Twilio screen sharing video track:', screenTrack);

    twilioRoom.localParticipant.publishTrack(screenTrack).then(function(publication) {
        console.log('The LocalTrack "' + publication.trackName + '" was successfully published.');
    }).catch(error => {
        console.log('Screen sharing track error:', error);
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
        });;

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