var restify = require('restify');
var pushover = require('node-pushover');

var push = new pushover({
    token: process.env.token
  , user : process.env.user
});

function knock(req, res, next) {
  if (req.params.knock === 'true') {
    json.knock = true;
    json.response = false;
    push.send("Knock", process.env.url + '/door/answer/notification?response=true');
  }
  res.end();
}

function getResponse(req, res, next) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  res.write(JSON.stringify(json));
  res.end();
}

function answerDoor(req, res, next) {
  if (req.params.response === 'true' && json.knock === true) {
    json.response = true;
    json.knock = false;

    // Unset response
    setTimeout(function () {
        json.response = false;
    }, 300000);
  }
  res.write('Door answered!')
  res.end();
}

var server = restify.createServer();
server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restify.gzipResponse());

// Setup CORS
restify.CORS.ALLOW_HEADERS.push('accept');
restify.CORS.ALLOW_HEADERS.push('sid');
restify.CORS.ALLOW_HEADERS.push('lang');
restify.CORS.ALLOW_HEADERS.push('origin');
restify.CORS.ALLOW_HEADERS.push('withcredentials');
restify.CORS.ALLOW_HEADERS.push('x-requested-with');
server.use(restify.CORS());

var json = { 
    knock   : false
  , response: false
};

server.get('/:name/door/knock', getResponse);
server.get('/:name/door/answer', getResponse);
server.get('/:name/door/answer/notification', answerDoor);
server.post('/:name/door/knock', knock);
server.post('/:name/door/answer', answerDoor);

var port = process.env.PORT || 5000;
server.listen(port, function() {
  console.log('Server started!');
});
