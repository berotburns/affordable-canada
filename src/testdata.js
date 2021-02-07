// Import Requirements
const { timeStamp } = require('console');
const fs = require('fs');
const util = require('util');
const csv = require("fast-csv");
const writeFile = util.promisify(fs.writeFile);

// Provinces + Territories
var provinces = [
    'alberta',
    'bc',
    'manitoba',
    'nb',
    'nl',
    'nwt',
    'novascotia',
    'nunavut',
    'ontario',
    'pei',
    'quebec',
    'sask',
    'yukon'
];

// Set up files + data objects
const files = [];
const provincedata = [];
const promises = [];

provinces.forEach(function (filename, p) {
    files[p] = "data/" + provinces[p] + "Master.csv";
    provincedata[p] = [];
    promises[p] = provinces[p] + "Promise";
});

// Write GeoJSON object
var gj = {
    "type": "FeatureCollection",
    "features": []
};

// Index JSON Objects together
var i = 0;

// While loop start
var j = 0;


// while (j < provinces.length) {
//     console.log(j);
//     j++;
// }



// Run loop through provinces to push data
async function runData() {
    while (j < provinces.length) {
        promises[j] = new Promise((resolve) => {
            csv
                .parseFile(files[j], { headers: true })
                .on('data', function (data) {
                    provincedata[j].push(data);
                })
                .on('end', function () {
                    provincedata[j]
                        .forEach(point => {
                            const { longitude, latitude, title, propertytype, provider, description, address, totalunits, url, hidden } = point;
                            gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider, "description": description, "address": address, "totalunits": totalunits, "url": url, "hidden": hidden } },);
                            gj.features[i].geometry.coordinates.push(longitude, latitude);
                            i++;
                        });
                    resolve();
                });
            j++;
        });
    }
    await j++;
}

runData();

// Once data is converted, aggregate into single json file
// Promise.all([
//     promises
// ])
//     .then(() => {
//         var json = JSON.stringify(gj);
//         writeFile('public/test.json', json)
//     });

// console.log(provincedata);
// console.log(promises);


// // Alberta
// const albertaPromise = new Promise((resolve) => {
//     csv
//         .parseFile(albertaMaster, { headers: true })
//         .on('data', function (data) {
//             albertaData.push(data);
//         })
//         .on('end', function () {
//             albertaData
//                 .forEach(point => {
//                     const { longitude, latitude, title, propertytype, provider, description, address, totalunits, affunits, rgiunits, url } = point;
//                     gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider,  "description": description, "address": address, "totalunits": totalunits, "affunits": affunits, "rgiunits": rgiunits, "url": url } },);
//                     gj.features[i].geometry.coordinates.push(longitude, latitude);
//                     i++;
//                 });
//             resolve();
//         });
// });