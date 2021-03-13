// Import Requirements
const { timeStamp } = require('console');
const fs = require('fs');
const util = require('util');
const csv = require("fast-csv");
const writeFile = util.promisify(fs.writeFile);

// Provinces
const provinces = [
    'ab',
    'bc',
    'mb',
    'nb',
    'nl',
    'nt',
    'ns',
    'nu',
    'on',
    'pe',
    'qc',
    'sk',
    'yt',
];

// Write constants
const masters = [];
const dataset = [];
const promises = [];

// Set provinces to constants
for (j = 0; j < provinces.length; j++) {
    masters[j] = 'data/' + provinces[j] + 'master.csv';
    dataset[j] = [];
}

async function printData() {

    // Write GeoJSON object
    var gj = {
        "type": "FeatureCollection",
        "features": []
    };

    // Index JSON Objects together
    var i = 0;

    for (j = 0; j < provinces.length; j++) {
        promises[j] = await new Promise((resolve) => {
            csv
                .parseFile(masters[j], { headers: true })
                .on('data', function (data) {
                    dataset[j].push(data);
                })
                .on('end', function () {
                    dataset[j]
                        .forEach(point => {
                            const { longitude, latitude, title, propertytype, group, provider, description, address, units, url, hidden } = point;
                            gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "group": group, "provider": provider, "description": description, "address": address, "units": units, "url": url, "hidden": hidden } },);
                            gj.features[i].geometry.coordinates.push(longitude, latitude);
                            i++;
                        });
                    resolve();
                });
        });;

        // Once data is converted, aggregate into single json file
        Promise.all([
            promises
        ])
            .then(() => {
                var json = JSON.stringify(gj);
                writeFile('src/data.json', json)
            });

    }
}

printData();