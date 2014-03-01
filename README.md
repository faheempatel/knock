#Knock

A doorbell for [Anand](https://twitter.com/subra_Anand).

##TODO
- [ ] Make prettier
- [ ] Move to Handlebar templates?
- [ ] Concatenate + minify CSS?
- [ ] Add a note to this readme explaining how the config files are to be written
- [ ] Make a favicon
- [ ] Make a push notification icon
- [ ] Lint CSS

##Notes

###API
- Built using Node.js and Restify

###Website
- Uses browserify
- bundle.min.js is the product of browserify and minification

###Arduino thing
- Lights up an LED and plays a sound upon receiving a knock from the web app
- Uses Processing
  - To receive and update data using the API

###Push Notification System
- Uses [Pushover](https://pushover.net) to send a push notification to Anand when someone 'knocks' 
- The notification sent includes a link which, when visited, acknowledges the knock through the API
