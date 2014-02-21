var $ = require('./jquery.min');
var config = require('./config');

function renderKnockView() {
  $('body')
     .css('background-color', 'rgb(255, 255, 255)');
  $('.container')
     .html('<button type="button" class="knock-button">Knock!</button>');
}

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
          clearInterval(interval);
          renderKnockView();
        }
        ++intervalCount;
      });
    }, 3000);
  });
});
