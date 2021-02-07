
// Mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoiamJlcm90YnVybnMiLCJhIjoiY2tnZDEycGY5MDJjdjMxb2VmempnZ2l4bCJ9.h2JMkQeM_ktA6GBTffAUsw';

// Build static map
var mapHeight = document.getElementById('map').clientHeight;
var mapWidth = document.getElementById('map').clientWidth;
var mapURL = "url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-96,57,3/" + mapWidth + "x" + mapHeight + "?access_token=pk.eyJ1IjoiamJlcm90YnVybnMiLCJhIjoiY2tnZDEycGY5MDJjdjMxb2VmempnZ2l4bCJ9.h2JMkQeM_ktA6GBTffAUsw')";
document.getElementById('static').style.backgroundImage = mapURL;

// Add Map
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-96, 57],
    zoom: 3
});

// Add controls to the map
map.addControl(new mapboxgl.NavigationControl());

var geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    fitBoundsOptions: {
        maxZoom: 10
    },
    showUserLocation: false,
    trackUserLocation: false
});

map.addControl(geolocate);

// Import data from JSON
var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "data.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

// Load the map
// Everything that requires the map to be loaded should live under here
map.on('load', function (e) {

    // Replace static map
    document.getElementById("static").style.display = "none";
    document.getElementById("map").style.visibility = "visible";
    
    // Zoom to current location
    //geolocate.trigger();

    map.addSource('places', {
        type: 'geojson',
        data: json,
        cluster: true,
        clusterMaxZoom: 10,
        clusterRadius: 40
    });

    // Add cluster layers
    map.addLayer({
        id: 'cluster',
        type: 'circle',
        source: 'places',
        filter: [
            "all",
            ['has', 'point_count'],
            ['!=', 'point_count', zerozero] // hacky way to count clusters at [0,0]
        ],
        paint: {
            'circle-color': '#ad2831',
            'circle-opacity': 0.9,
            'circle-radius': [
                'step', ['get', 'point_count'],
                24,
                800,
                32
            ]
        }
    });

    // Text for clusters
    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'places',
        filter: [
            "all",
            ['has', 'point_count'],
            ['!=', 'point_count', zerozero] // hacky way to count clusters at [0,0]
        ],
        paint: {
            'text-color': '#ffffff',
        },
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['Arial Unicode MS Bold'],
            'text-size': 13
        }
    });

    // Add a symbol layer
    map.addLayer({
        id: 'property',
        type: 'circle',
        source: 'places',
        filter: ['==', 'hidden', ''],
        paint: {
            'circle-color': '#ad2831',
            'circle-radius': 7,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#ffffff',
        }
    });

    // inspect a cluster on click
    map.on('click', 'cluster', function (e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ['cluster']
        });
        var clusterId = features[0].properties.cluster_id;
        map.getSource('places').getClusterExpansionZoom(
            clusterId,
            function (err, zoom) {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    // Click on property
    map.on('click', 'property', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var title = e.features[0].properties.title;
        var description = e.features[0].properties.description;
        var address = e.features[0].properties.address;
        var units = e.features[0].properties.totalunits;
        var url = e.features[0].properties.url;

        // Handle Units meta
        if (units > 0) {
            units = 'Total units: ' + units;
        } else {
            units = units;
        };

        // Handle URL meta
        if (url.length > 0) {
            url = '<a href="' + url + '" target="_blank">More Info</a></div>';
        } else {
            url = url;
        };

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
                '<div id="cardtitle">' + title +
                '</div><div id="carddesc">' + description +
                '</div><div id="cardmeta">' + address +
                '</div><div id="cardmeta">' + units +
                '</p></div><div id="cardurl">' + url
            )
            .addTo(map);
    });

    // On Hover
    map.on('mouseenter', 'cluster', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'cluster', function () {
        map.getCanvas().style.cursor = '';
    });

    map.on('mouseenter', 'property', function () {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', 'property', function () {
        map.getCanvas().style.cursor = '';
    });

});

// Calculating the total available units
var unitarray = [];
for (i = 0; i < json.features.length; i++) { //loop through the array
    unitarray[i] = parseInt(json.features[i].properties.totalunits, 10); //Do the math!
    if (isNaN(unitarray[i])) {
        unitarray[i] = 0;
    }
    unitarray[i];
}
var unitcount = unitarray.reduce((a, b) => a + b, 0);
document.getElementById("unitCount").innerHTML = unitcount.toLocaleString();


// Calculating number of [0,0] units
var zerozero = 0;
for (i = 0; i < json.features.length; i++) { //loop through the array
    if (json.features[i].geometry.coordinates[0] == 0) {
        zerozero++;
    }
}

// Debugging information
var zoomlevel = map.getZoom();
document.getElementById("zoom").innerHTML = Math.round(zoomlevel * 100) / 100;
map.on('move', function () {
    zoomlevel = map.getZoom();
    document.getElementById("zoom").innerHTML = Math.round(zoomlevel * 100) / 100;
});