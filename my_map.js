
// ///////////////////////
// ADDING WMS LAYERS //
/////////////////////////

// Defining the Railway Track as layer:
var track = new ol.layer.Image({
    source: new ol.source.ImageWMS({
    url:
    'https://maps.geogratis.gc.ca/wms/railway_en',
    params: {'LAYERS': 'railway.track'}
    }),
    title: 'Railway Track',
    opacity: 1,
});


// Defining Railway Stations as layer:
var stations = new ol.layer.Image({
    source: new ol.source.ImageWMS({
    url:
    'https://maps.geogratis.gc.ca/wms/railway_en',
    params: {'LAYERS': 'railway.station'}
    }),
    title: 'Railway Stations',
    opacity: 1
});


// Defining Railway Crossings
//////////////////////////
var crossings = new ol.layer.Image({
    source: new ol.source.ImageWMS({
    url:
    'https://maps.geogratis.gc.ca/wms/railway_en',
    params: {'LAYERS': 'railway.crossing'}
    }),
    title: 'Railway Crossings',
    opacity: 1
});


// Defining Railway Subdivision Name 
var division_name = new ol.layer.Image({
    source: new ol.source.ImageWMS({
    url:
    'https://maps.geogratis.gc.ca/wms/railway_en',
    params: {'LAYERS': 'railway.subdivision'}
    }),
    title: 'Railway Subdivision Name',
    opacity: 1
});

 
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
    source: cbmtSource
});


//Defining DEM as a source of tiles
var reliefSource = new ol.source.TileWMS({
    url: 'http://maps.geogratis.gc.ca/wms/elevation_en',
    params: {
    LAYERS: 'cdem.color-shaded-relief'},
    attributions: [new ol.Attribution({html: "The Canadian Digital Elevation Model (CDEM) <br> is part of Natural Resources Canada altimetry<br> system designed to better meet the users'<br> needs for elevation data and products.<br> In this data, elevations can be either ground <br> or reflective surface elevations. <br> <a href=https://open.canada.ca/data/en/dataset/7f245e4d-76c2-4caa-951a-45d1d2051333>Canadian Digital Elevation Model</a>"})]
});

// Defining the landsat mapping as a layer:
var relief = new ol.layer.Tile({
    title: 'Digital Elevation Model',
    type: 'base',
    source: reliefSource
});


// Defining Open Street Map as a source of tiles:
var osmTiles = new ol.source.OSM();

// Defining Open Street Map as a layer:
var osmBase = new ol.layer.Tile({
    source: osmTiles,
    title: 'Modern',
    type: 'base'
});
// ///////////////////
// CREATING THE MAP //
// ///////////////////

// Define an overview map as a control:
var overviewMapControl = new ol.control.OverviewMap({
    layers: [cbmt, relief, osmBase],
    collapsed: false
});

// Creating the map:
var map = new ol.Map({
    controls: ol.control.defaults().extend([overviewMapControl]),
    view: new ol.View({
    center: [-12227139, 7372882],
    zoom: 5 }),
    layers: [relief, cbmt, osmBase, division_name, crossings, stations, track, ],
    target: 'js-map'
});

// Adding the layer switcher control:
var layerSwitcher = new ol.control.LayerSwitcher({
    tipLabel: 'Layers' // Optional label for button
});
map.addControl(layerSwitcher);

// map.addLayer(garbage)


////////////////////////
//Collapsible button in side panel
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}


var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    } 
  });
}


