var port = process.env.PORT || 3000;
var express = require('express');
var { nextTick } = require('process');
var favicon = require('serve-favicon');
var path = require('path');
var ua = require('universal-analytics');
var bodyParser = require('body-parser');
var { readFile } = require('fs').promises;
var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static('public'));

//Google Analytics
var visitor = ua('41726341');
visitor.pageview("/", function (err) {
    console.log("Views sent to GA");
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/', function (req, res) {
    var print = req.body.bug;
    visitor.event("Event Category", "Event Action", print, 42, function (err) {
        console.log("Event sent to GA");
    });
    console.log("Coordinates received:" + print);
    res.redirect('back');
});

app.listen(port, function () {
    console.log("Server is running on localhost:3000");
});