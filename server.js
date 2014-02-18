var restify = require('restify');

function knock(req, res, next) {
  if (req.body.knock === "true") {
      json.knock = true;
      json.response = false;
  }
  res.end();
}

function getResponse(req, res, next) {
  res.writeHead(200, {
      'Content-Type' : 'application/json'
  });
  res.write(JSON.stringify(json));
  res.end();
}

function answerDoor(req, res, next) {
  if (req.body.response === "true" && json.knock === true) {
      json.response = true;
      json.knock = false;

      // Unset response
      setTimeout(function () {
          json.response = false;
      }, 300000);
  }
  res.end();
}

var server = restify.createServer();
server.use(restify.bodyParser({ mapParams: false }));

// Setup CORS
restify.CORS.ALLOW_HEADERS.push('accept');
restify.CORS.ALLOW_HEADERS.push('sid');
restify.CORS.ALLOW_HEADERS.push('lang');
restify.CORS.ALLOW_HEADERS.push('origin');
restify.CORS.ALLOW_HEADERS.push('withcredentials');
restify.CORS.ALLOW_HEADERS.push('x-requested-with');
server.use(restify.CORS());


var json = { 
    'knock'   : 'false'
  , 'response': 'false'
};

server.get('/:name/door/knock', getResponse);
server.get('/:name/door/answer', getResponse);
server.post('/:name/door/knock', knock);
server.post('/:name/door/answer', answerDoor);

server.listen(8080, function() {
  console.log('Server started!');
});
