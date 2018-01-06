const express = require('express');
const app = express();
const WebSocket = require('ws');

var bodyParser = require("body-parser");
var ws = new WebSocket('ws://localhost:8080/data/websocket')

ws.onmessage = function (e) {
    console.log(e.data)
}

ws.onopen = function () {
    console.log('Opening...')
    ws.send('Hello Server')
}

ws.onerror = function (error) {
    console.log('WEbSocket error ' + error)
    console.dir(error)
}

// serve static content from under /public/ dir
app.use('/', express.static(__dirname + "/public/"));
app.use('/node_modules', express.static(__dirname + "/node_modules/"));
app.use(bodyParser.urlencoded({extended: false}))

app.get('/api', function (req, res) {
    res.json({message: 'Lead Management API'});
});

app.post('/api/callin', function (req, res) {
    number = req.body.number;
    res.json({message: 'Incoming call from ' + number});
    wsc.send("{\"message\":" + number + "}");
});

app.post('/api/callend', function (req, res) {
    number = req.body.number;
    res.json({message: 'Ended call from ' + number});
    wsc.send("{\"message\":" + number + "}");
});

app.listen(4000, function () {
    console.log("Server started at port 4000");
});
