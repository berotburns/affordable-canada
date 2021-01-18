const express = require('express');
const { nextTick } = require('process');
const favicon = require('serve-favicon');
const path = require('path');

const { readFile } = require('fs').promises;
const data = require('./src/readdata.js')

const app = express();

app.use(favicon(path.join(__dirname, '', 'favicon.ico')));

app.get('/', async(request, load, response) => {

    data();


    // Simplified load
    response.send(await readFile('./index.html', 'utf8'));

})