# National Railway Network, Canada

An interactive web map of Canada's national railway network, built with OpenLayers and live Web Map Service (WMS) data from Natural Resources Canada.

**Live site:** [web-gis-openlayers.vercel.app](https://web-gis-openlayers.vercel.app)

## What the map shows

- Railway tracks
- Railway stations
- Railway crossings
- Railway subdivision names

The layer switcher can toggle each railway layer and choose between OpenStreetMap, the Canada Base Map – Transportation, and Canadian elevation relief basemaps. The sidebar provides a short description of each railway feature type.

## Data and map scale

Railway data is requested from the [Natural Resources Canada GeoGratis WMS](https://maps.geogratis.gc.ca/wms/railway_en). Some layers are scale-dependent:

- Tracks are available at the national and regional levels.
- Stations and subdivision labels appear after zooming in to a regional view.
- Crossings are rendered by the source service at approximately 1:20,000 or closer, so they require a detailed local view.

Map tiles are requested directly from their source services. An internet connection is therefore required even when the project is served locally.

## Run locally

This is a static site with no build step or package installation.

```sh
python3 -m http.server 8008
```

Open [http://localhost:8008](http://localhost:8008) in a browser.

## Project files

- `index.html` — page structure and layer information
- `my_map.js` — map configuration, WMS layers, controls, and interactions
- `my_map.css` — application layout and responsive styling
- `ol.js` and `ol.css` — vendored OpenLayers assets
- `ol-layerswitcher.js` and `ol-layerswitcher.css` — layer switcher control

## Deployment

The site is deployed as a static Vercel project from the repository root. No build command or environment variables are required.

## Data attribution

Railway, transportation, and elevation datasets are provided by [Natural Resources Canada](https://natural-resources.canada.ca/). The default basemap is © [OpenStreetMap contributors](https://www.openstreetmap.org/copyright).
