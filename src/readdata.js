// Import Requirements
const { timeStamp } = require('console');
const fs = require('fs');
const util = require('util');
const csv = require("fast-csv");
const writeFile = util.promisify(fs.writeFile);

// List Files
const bcMaster = 'data/bcmaster.csv';
const novascotiaMaster = 'data/novascotiamaster.csv';
const ontarioMaster = 'data/ontariomaster.csv';
const quebecmaster = 'data/quebecmaster.csv'
// const testMaster = 'data/test.csv';

// Create Data
const bcData = [];
const novascotiaData = [];
const ontarioData =[];
const quebecData =[];
// const testData = [];

// Write GeoJSON object
var gj = {
    "type": "FeatureCollection",
    "features": []
};

// Index JSON Objects together
var i = 0;

// // Test
// const testPromise = new Promise((resolve) => {
//     csv
//         .parseFile(testMaster, { headers: true })
//         .on('data', function (data) {
//             testData.push(data);
//         })
//         .on('end', function () {
//             testData
//                 .forEach(point => {
//                     const { longitude, latitude, title, propertytype, provider, description, address, totalunits, affunits, rgiunits, url } = point;
//                     gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider,  "description": description, "address": address, "totalunits": totalunits, "affunits": affunits, "rgiunits": rgiunits, "url": url } },);
//                     gj.features[i].geometry.coordinates.push(longitude, latitude);
//                     i++;
//                 });
//             resolve();
//         });
// });

// British Columbia 
const bcPromise = new Promise((resolve) => {
    csv
        .parseFile(bcMaster, { headers: true })
        .on('data', function (data) {
            bcData.push(data);
        })
        .on('end', function () {
            bcData
                .forEach(point => {
                    const { longitude, latitude, title, propertytype, provider, description, address, totalunits, affunits, rgiunits, url } = point;
                    gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider,  "description": description, "address": address, "totalunits": totalunits, "affunits": affunits, "rgiunits": rgiunits, "url": url } },);
                    gj.features[i].geometry.coordinates.push(longitude, latitude);
                    i++;
                });
            resolve();
        });
});

// Nova Scotia
const novascotiaPromise = new Promise((resolve) => {
    csv
        .parseFile(novascotiaMaster, { headers: true })
        .on('data', function (data) {
            novascotiaData.push(data);
        })
        .on('end', function () {
            novascotiaData
                .forEach(point => {
                    const { longitude, latitude, title, propertytype, provider, description, address, totalunits, affunits, rgiunits, url } = point;
                    gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider,  "description": description, "address": address, "totalunits": totalunits, "affunits": affunits, "rgiunits": rgiunits, "url": url } },);
                    gj.features[i].geometry.coordinates.push(longitude, latitude);
                    i++;
                });
            resolve();
        });
});

// Ontario
const ontarioPromise = new Promise((resolve) => {
    csv
        .parseFile(ontarioMaster, { headers: true })
        .on('data', function (data) {
            ontarioData.push(data);
        })
        .on('end', function () {
            ontarioData
                .forEach(point => {
                    const { longitude, latitude, title, propertytype, provider, description, address, totalunits, affunits, rgiunits, url } = point;
                    gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider,  "description": description, "address": address, "totalunits": totalunits, "affunits": affunits, "rgiunits": rgiunits, "url": url } },);
                    gj.features[i].geometry.coordinates.push(longitude, latitude);
                    i++;
                });
            resolve();
        });
});

// Quebec
const quebecPromise = new Promise((resolve) => {
    csv
        .parseFile(quebecmaster, { headers: true })
        .on('data', function (data) {
            quebecData.push(data);
        })
        .on('end', function () {
            quebecData
                .forEach(point => {
                    const { longitude, latitude, title, propertytype, provider, description, address, totalunits, affunits, rgiunits, url } = point;
                    gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider,  "description": description, "address": address, "totalunits": totalunits, "affunits": affunits, "rgiunits": rgiunits, "url": url } },);
                    gj.features[i].geometry.coordinates.push(longitude, latitude);
                    i++;
                });
            resolve();
        });
});



// Once data is converted, aggregate into single json file
Promise.all([
    bcPromise,
    novascotiaPromise,
    ontarioPromise,
    quebecPromise,
    // testPromise,
])
    .then(() => {
        var json = JSON.stringify(gj);
        writeFile('public/data.json', json)
    });