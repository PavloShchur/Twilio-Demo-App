Twilio Demo App
------------------

This application is designed for Twilio team to reproduce video related issues. It will run on Heroku.

Before using the app you need to specify Access Token. More information about access tokens are here [Generate an Access Token](https://www.twilio.com/docs/video/javascript-getting-started#3-generate-an-access-token).

Please follow these steps to reproduce the issue describe here https://github.com/twilio/twilio-video.js/issues/1857:
1. Click "Start screen sharing." button;
2. Make sure that in browser console "The LocalTrack "Sharing" was successfully published." appeared;
3. Click "Turn on camera." button.

If this link (https://twilio-demo-app.herokuapp.com/) does not work use the button below to deploy th app to your Heroku instance.

https://twilio-demo-app.herokuapp.com: https://github.com/PavloShchur/twilio-demo-app/commit/e29c9ef73323b21e32b1156ed4e52d078984b4b0) is not taken into account;
https://twilio-demo-app-workardound.herokuapp.com: https://github.com/PavloShchur/twilio-demo-app/commit/e29c9ef73323b21e32b1156ed4e52d078984b4b0) is taken into account;

<a href="https://heroku.com/deploy">
  <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>

Please feel free to contact if there are any questions.
