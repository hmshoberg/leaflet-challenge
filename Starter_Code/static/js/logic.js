// Creating the map object
let myMap = L.map("map", {
    center: [48.1667, -100.1667],
    zoom: 4
  });
  
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Use this link to get the GeoJSON data.
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Use d3 JSON to get data
d3.json(link).then(function(earthquakeData) {
    //Send data.features object to the createFeatures function.
    console.log(earthquakeData);
});

// Function to style each marker based on magnitude and depth
function style(feature) {
    return {
      radius: feature.properties.mag * 2,  // Adjust the multiplier for better visualization
      fillColor: getColor(feature.properties.depth),
      color: '#000',
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    };
  }

