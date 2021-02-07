// Import Requirements
const { timeStamp } = require('console');
const fs = require('fs');
const util = require('util');
const csv = require("fast-csv");
const writeFile = util.promisify(fs.writeFile);

// List Files
const albertaMaster = 'data/albertamaster.csv';
const bcMaster = 'data/bcmaster.csv';
const manitobaMaster = 'data/manitobamaster.csv';
const nbMaster = 'data/nbmaster.csv';
const nlMaster = 'data/nlmaster.csv';
const nwtMaster = 'data/nwtmaster.csv';
const novascotiaMaster = 'data/novascotiamaster.csv';
const nunavutMaster = 'data/nunavutmaster.csv';
const ontarioMaster = 'data/ontariomaster.csv';
const peiMaster = 'data/peimaster.csv';
const quebecMaster = 'data/quebecmaster.csv';
const saskMaster = 'data/saskmaster.csv';
const yukonMaster = 'data/yukonmaster.csv';

// Create Data
const albertaData = [];
const bcData = [];
const manitobaData = [];
const nbData = [];
const nlData = [];
const nwtData = [];
const novascotiaData = [];
const nunavutData = [];
const ontarioData =[];
const peiData =[];
const quebecData =[];
const saskData =[];
const yukonData =[];

// Write GeoJSON object
var gj = {
    "type": "FeatureCollection",
    "features": []
};

// Index JSON Objects together
var i = 0;

// Alberta
const albertaPromise = new Promise((resolve) => {
    csv
        .parseFile(albertaMaster, { headers: true })
        .on('data', function (data) {
            albertaData.push(data);
        })
        .on('end', function () {
            albertaData
                .forEach(point => {
                    const { longitude, latitude, title, propertytype, provider, description, address, totalunits, url, hidden } = point;
                    gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider,  "description": description, "address": address, "totalunits": totalunits, "url": url, "hidden": hidden } },);
                    gj.features[i].geometry.coordinates.push(longitude, latitude);
                    i++;
                });
            resolve();
        });
});

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
                    const { longitude, latitude, title, propertytype, provider, description, address, totalunits, url, hidden } = point;
                    gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider,  "description": description, "address": address, "totalunits": totalunits, "url": url, "hidden": hidden } },);
                    gj.features[i].geometry.coordinates.push(longitude, latitude);
                    i++;
                });
            resolve();
        });
});

// Manitoba 
const manitobaPromise = new Promise((resolve) => {
    csv
        .parseFile(manitobaMaster, { headers: true })
        .on('data', function (data) {
            manitobaData.push(data);
        })
        .on('end', function () {
            manitobaData
                .forEach(point => {
                    const { longitude, latitude, title, propertytype, provider, description, address, totalunits, url, hidden } = point;
                    gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider,  "description": description, "address": address, "totalunits": totalunits, "url": url, "hidden": hidden } },);
                    gj.features[i].geometry.coordinates.push(longitude, latitude);
                    i++;
                });
            resolve();
        });
});

// New Brunswick
const nbPromise = new Promise((resolve) => {
    csv
        .parseFile(nbMaster, { headers: true })
        .on('data', function (data) {
            nbData.push(data);
        })
        .on('end', function () {
            nbData
                .forEach(point => {
                    const { longitude, latitude, title, propertytype, provider, description, address, totalunits, url, hidden } = point;
                    gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider,  "description": description, "address": address, "totalunits": totalunits, "url": url, "hidden": hidden } },);
                    gj.features[i].geometry.coordinates.push(longitude, latitude);
                    i++;
                });
            resolve();
        });
});

// Newfoundland and Labrador
const nlPromise = new Promise((resolve) => {
    csv
        .parseFile(nlMaster, { headers: true })
        .on('data', function (data) {
            nlData.push(data);
        })
        .on('end', function () {
            nlData
                .forEach(point => {
                    const { longitude, latitude, title, propertytype, provider, description, address, totalunits, url, hidden } = point;
                    gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider,  "description": description, "address": address, "totalunits": totalunits, "url": url, "hidden": hidden } },);
                    gj.features[i].geometry.coordinates.push(longitude, latitude);
                    i++;
                });
            resolve();
        });
});

// Northwest Territories
const nwtPromise = new Promise((resolve) => {
    csv
        .parseFile(nwtMaster, { headers: true })
        .on('data', function (data) {
            nwtData.push(data);
        })
        .on('end', function () {
            nwtData
                .forEach(point => {
                    const { longitude, latitude, title, propertytype, provider, description, address, totalunits, url, hidden } = point;
                    gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider,  "description": description, "address": address, "totalunits": totalunits, "url": url, "hidden": hidden } },);
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
                    const { longitude, latitude, title, propertytype, provider, description, address, totalunits, url, hidden } = point;
                    gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider,  "description": description, "address": address, "totalunits": totalunits, "url": url, "hidden": hidden } },);
                    gj.features[i].geometry.coordinates.push(longitude, latitude);
                    i++;
                });
            resolve();
        });
});

// Nunavut
const nunavutPromise = new Promise((resolve) => {
    csv
        .parseFile(nunavutMaster, { headers: true })
        .on('data', function (data) {
            nunavutData.push(data);
        })
        .on('end', function () {
            nunavutData
                .forEach(point => {
                    const { longitude, latitude, title, propertytype, provider, description, address, totalunits, url, hidden } = point;
                    gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider,  "description": description, "address": address, "totalunits": totalunits, "url": url, "hidden": hidden } },);
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
                    const { longitude, latitude, title, propertytype, provider, description, address, totalunits, url, hidden } = point;
                    gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider,  "description": description, "address": address, "totalunits": totalunits, "url": url, "hidden": hidden } },);
                    gj.features[i].geometry.coordinates.push(longitude, latitude);
                    i++;
                });
            resolve();
        });
});

// Prince Edward Island
const peiPromise = new Promise((resolve) => {
    csv
        .parseFile(peiMaster, { headers: true })
        .on('data', function (data) {
            peiData.push(data);
        })
        .on('end', function () {
            peiData
                .forEach(point => {
                    const { longitude, latitude, title, propertytype, provider, description, address, totalunits, url, hidden } = point;
                    gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider,  "description": description, "address": address, "totalunits": totalunits, "url": url, "hidden": hidden } },);
                    gj.features[i].geometry.coordinates.push(longitude, latitude);
                    i++;
                });
            resolve();
        });
});

// Quebec
const quebecPromise = new Promise((resolve) => {
    csv
        .parseFile(quebecMaster, { headers: true })
        .on('data', function (data) {
            quebecData.push(data);
        })
        .on('end', function () {
            quebecData
                .forEach(point => {
                    const { longitude, latitude, title, propertytype, provider, description, address, totalunits, url, hidden } = point;
                    gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider,  "description": description, "address": address, "totalunits": totalunits, "url": url, "hidden": hidden } },);
                    gj.features[i].geometry.coordinates.push(longitude, latitude);
                    i++;
                });
            resolve();
        });
});

// Saskatchewan
const saskPromise = new Promise((resolve) => {
    csv
        .parseFile(saskMaster, { headers: true })
        .on('data', function (data) {
            saskData.push(data);
        })
        .on('end', function () {
            saskData
                .forEach(point => {
                    const { longitude, latitude, title, propertytype, provider, description, address, totalunits, url, hidden } = point;
                    gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider,  "description": description, "address": address, "totalunits": totalunits, "url": url, "hidden": hidden } },);
                    gj.features[i].geometry.coordinates.push(longitude, latitude);
                    i++;
                });
            resolve();
        });
});

// Yukon
const yukonPromise = new Promise((resolve) => {
    csv
        .parseFile(yukonMaster, { headers: true })
        .on('data', function (data) {
            yukonData.push(data);
        })
        .on('end', function () {
            yukonData
                .forEach(point => {
                    const { longitude, latitude, title, propertytype, provider, description, address, totalunits, url, hidden } = point;
                    gj.features.push({ "type": "Feature", "geometry": { "type": "Point", "coordinates": [] }, "properties": { "title": title, "propertytype": propertytype, "provider": provider,  "description": description, "address": address, "totalunits": totalunits, "url": url, "hidden": hidden } },);
                    gj.features[i].geometry.coordinates.push(longitude, latitude);
                    i++;
                });
            resolve();
        });
});


// Once data is converted, aggregate into single json file
Promise.all([
    albertaPromise,
    bcPromise,
    manitobaPromise,
    nbPromise,
    nlPromise,
    nwtPromise,
    novascotiaPromise,
    nunavutPromise,
    ontarioPromise,
    peiPromise,
    quebecPromise,
    saskPromise,
    yukonPromise,
])
    .then(() => {
        var json = JSON.stringify(gj);
        writeFile('public/data.json', json)
    });