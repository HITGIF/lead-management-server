const PORT = 8080;

var http = require('http');
var server = http.createServer();
var sockjs = require('sockjs');
var wss = sockjs.createServer();

wss.on('connection', function (ws) {
    ws.on('data', function (data) {
        ws.write('From Lead Management Server: ' + data)
    });
    ws.on('close', function () {
        console.log('close')
    });
});

wss.installHandlers(server, {prefix: '/data'});
server.listen(PORT);
