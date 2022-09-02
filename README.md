Twilio Demo App
------------------

This application is designed for Twilio team to reproduce video related issues. It will run on Heroku.

Before using the app you need to specify SID of the Twilio Account, API Key and API Secret. The app uses these credentials for authentication purposes only and does not store them.

Please follow these steps to reproduce the issue describe here https://github.com/twilio/twilio-video.js/issues/1857:
1. Click "Start screen sharing." button;
2. Make sure that in browser console "The LocalTrack "Sharing" was successfully published." appeared;
3. Click "Turn on camera." button.

If this link (https://twilio-demo-app.herokuapp.com/) does not work use the button below to deploy th app to your Heroku instance.

<a href="https://heroku.com/deploy">
  <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>

Please feel free to contact if there are any questions.
