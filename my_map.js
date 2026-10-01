
// ///////////////////////
// ADDING WMS LAYERS //
/////////////////////////

var railwayWmsUrl = 'https://maps.geogratis.gc.ca/wms/railway_en';

function createRailwayLayer(title, layerName, maxResolution) {
    return new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: railwayWmsUrl,
            params: {
                'LAYERS': layerName,
                'FORMAT': 'image/png',
                'TRANSPARENT': true,
                'VERSION': '1.3.0'
            }
        }),
        title: title,
        opacity: 1,
        // Match the display limits advertised by the GeoGratis WMS.
        maxResolution: maxResolution
    });
}

// Track segments have no maximum scale denominator in the WMS capabilities.
var track = createRailwayLayer('Railway Track', 'railway.track');


// Defining Railway Stations as layer:
var stations = createRailwayLayer(
    'Railway Stations',
    'railway.station',
    560 // 1:2,000,000
);


// Defining Railway Crossings
//////////////////////////
var crossings = createRailwayLayer(
    'Railway Crossings',
    // Keep the control enabled at every zoom. The WMS applies its own
    // 1:20,000 display threshold and returns crossing symbols when zoomed in.
    'railway.crossing'
);


// Defining Railway Subdivision Name 
var divisionName = createRailwayLayer(
    'Railway Subdivision Name',
    'railway.subdivision',
    700 // 1:2,500,000
);

 
// ////////////////////////
// DEFINING BASE MAPPING //
// ////////////////////////


//Defining Canada Base Map Transportation as a source of tiles
var cbmtSource = new ol.source.TileWMS({
    url: 'https://maps.geogratis.gc.ca/wms/CBMT',
    params: {
    LAYERS: 'National',},
    attributions: [new ol.Attribution({html: 'The Canada Transportation Base Map (CBMT) <br> web mapping service provides spatial reference <br> context with an emphasis on transportation networks. <br> It is designed especially for use as a background map <br> in a web mapping application or geographic information <br> system  (GIS). <a href="https://open.canada.ca/data/en/dataset/296de17c-001c-4435-8f9a-f5acab632e85">CBMT</a>'})]
});


// Defining the landcover as a layer:
var cbmt = new ol.layer.Tile({
    title: 'Canada Base Map – Transportation',
    type: 'base',
    visible: false,
    source: cbmtSource
});


//Defining DEM as a source of tiles
var reliefSource = new ol.source.TileWMS({
    url: 'https://maps.geogratis.gc.ca/wms/elevation_en',
    params: {
    LAYERS: 'cdem.color-shaded-relief'},
    attributions: [new ol.Attribution({html: "The Canadian Digital Elevation Model (CDEM) <br> is part of Natural Resources Canada altimetry<br> system designed to better meet the users'<br> needs for elevation data and products.<br> In this data, elevations can be either ground <br> or reflective surface elevations. <br> <a href=https://open.canada.ca/data/en/dataset/7f245e4d-76c2-4caa-951a-45d1d2051333>Canadian Digital Elevation Model</a>"})]
});

// Defining the landsat mapping as a layer:
var relief = new ol.layer.Tile({
    title: 'Digital Elevation Model',
    type: 'base',
    visible: false,
    source: reliefSource
});


// Defining Open Street Map as a source of tiles:
var osmTiles = new ol.source.OSM();

// Defining Open Street Map as a layer:
var osmBase = new ol.layer.Tile({
    source: osmTiles,
    title: 'Modern',
    type: 'base',
    visible: true
});
// ///////////////////
// CREATING THE MAP //
// ///////////////////

// Define an overview map as a control:
var overviewMapControl = new ol.control.OverviewMap({
    layers: [new ol.layer.Tile({source: new ol.source.OSM()})],
    collapsed: false
});

// Creating the map:
var map = new ol.Map({
    controls: ol.control.defaults().extend([overviewMapControl]),
    view: new ol.View({
    // Start close enough for stations and subdivision labels to render.
    center: ol.proj.fromLonLat([-113.4909, 53.5461]),
    zoom: 9 }),
    // Lines go below point and label overlays so they cannot obscure them.
    layers: [relief, cbmt, osmBase, track, divisionName, stations, crossings],
    target: 'js-map'
});

// Adding the layer switcher control:
var layerSwitcher = new ol.control.LayerSwitcher({
    tipLabel: 'Layers' // Optional label for button
});
map.addControl(layerSwitcher);

////////////////////////
//Collapsible button in side panel
var coll = document.getElementsByClassName('collapsible');
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener('click', function() {
    var expanded = this.getAttribute('aria-expanded') === 'true';
    this.classList.toggle('active', !expanded);
    this.setAttribute('aria-expanded', String(!expanded));
    var content = this.nextElementSibling;
    content.hidden = expanded;
    content.style.maxHeight = expanded ? null : content.scrollHeight + 'px';
  });
}
