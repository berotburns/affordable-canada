var port = process.env.PORT || 3000;
var express = require('express');
var { nextTick } = require('process');
var favicon = require('serve-favicon');
var path = require('path');
var { readFile } = require('fs').promises;
var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.listen(port, function () {
    console.log("Server is running on localhost:3000");
});