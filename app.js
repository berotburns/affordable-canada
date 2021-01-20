const express = require('express');
const { nextTick } = require('process');
const favicon = require('serve-favicon');
const path = require('path');

const { readFile } = require('fs').promises;

const app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static('public'));


app.get ("/",(req,res) => {
    res.sendFile(__dirname + "/index.html");
    //res.sendFile(__dirname + "/data/data.json");
});

app.listen(3000, function () {
    console.log("Server is running on localhost:3000");
});