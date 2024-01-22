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
  d3.json(link).then(function (earthquakeData) {
    // Send data.features object to the createFeatures function.
    console.log(earthquakeData);
  
    // Create a variable for earthquakes
    let earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,
      pointToLayer: createCircleMarker,
      style: style // Apply the style function to each feature
    }).addTo(myMap); // Move .addTo(myMap) here
  });
  
  // Function to create a circle marker for each earthquake
  function createCircleMarker(feature, latlng) {
    return L.circleMarker(latlng, style(feature));
  }
  
  // Give each feature a popup describing the place and time of the earthquakes
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Where: ${feature.properties.place}</h3><hr><p>Time: ${new Date(feature.properties.time)}</p><hr><p>Magnitude: ${feature.properties.mag}</p><hr><p>Number of "Felt" Reports: ${feature.properties.felt}`);
  }
  
  // Function to style each marker based on magnitude and depth
  function style(feature) {
    return {
      radius: feature.properties.mag * 5, // Adjust the multiplier for better visualization
      fillColor: getColor(feature.geometry.coordinates[2]), // Use depth from coordinates
      color: '#000',
      weight: 1,
      opacity: 0.8,
      fillOpacity: 0.5
    };
  }
  
  // Function to get color based on depth
  function getColor(depth) {
    return depth > 10 ? '#red' :
    depth > 30 ? '#redorange' :
    depth > 50 ? '#orange' :
    depth > 70 ? '#orangeyellow' :
    depth > 90 ? '#yellow' :
    '#green';
  }

  
// Create a legend control
var legend = L.control({ position: 'bottomright' });

// Create a legend control
var legend = L.control({ position: 'bottomright' });

// Function to update the legend based on the depth range
legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend'),
    depths = [0, 10, 30, 50, 70, 90],
    labels = [];

  // loop through depth intervals and generate a label with a colored square for each interval
  for (var i = 0; i < depths.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
      depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
  }

  return div;
};

// Add legend to the map
legend.addTo(myMap);
  
  
  

  
 
