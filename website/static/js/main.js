var $ = require('./jquery.min');
var config = require('./config');

function renderWaitingView() {
  $('body')
     .css('background-color', 'rgb(219, 219, 219)');
  $('.container')
     .html('<i class="fa fa-circle dot"></i><i class="fa fa-circle dot"></i><i class="fa fa-circle dot"></i>');
}

function renderAcceptedView() {
  $('body')
     .css('background-color', 'rgb(148, 255, 134)');
  $('.container')
     .html('<i class="fa fa-check tick"></i>');
}

$('.knock-button').on('click', function() {
  renderWaitingView();
  // Send knock 
  $.post(config.url, { knock: true }, function() {
    // Get response JSON every 3 seconds for 3 minutes
    var intervalCount = 0;
    var interval = setInterval(function() {
      $.getJSON(config.url, function(json) {
        if (json.response === true) {
          clearInterval(interval);
          renderAcceptedView();
        } else if (intervalCount === 60) {
          // Return to knock button view
          clearInterval(interval);
          location.reload();
        }
        ++intervalCount;
      });
    }, 3000);
  });
});
