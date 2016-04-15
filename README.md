#Knock

A doorbell for [Anand](https://twitter.com/subra_Anand). Some thoughts around Knock [here](http://blog.faheempatel.com/post/80599561986/last-month-with-two-friends-anand-and-umar-i).

##TODO
- [ ] Make prettier
- [x] Concatenate + minify CSS
- [ ] Add a note to this readme explaining how the config files are to be written
- [ ] Make a favicon
- [ ] Make a push notification icon
- [x] Lint CSS
- [ ] Use CSS transform for animation
- [ ] Button's active state on mobile

##Notes

###API
- Built using Node.js and Restify

###Website
- Uses browserify
- bundle.min.js is the product of browserify and minification

###Arduino Signifier
- Lights up an LED and plays a sound upon receiving a knock from the web app
- Uses Processing to receive and update data using the API

###Push Notification System
- Uses [Pushover](https://pushover.net) to send a push notification to Anand when someone 'knocks' 
- The notification sent includes a link which, when visited, acknowledges the knock via the API
