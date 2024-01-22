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
      fillColor: getColor(feature.geometry.coordinates[2]), // Use depth from coordinates via hint
      color: '#000',
      weight: 1,
      opacity: 0.8,
      fillOpacity: 0.5
    };
  }
  
// Getting the colors for the circles and legend based on depth
function getColor(depth) {
    return depth >= 90 ? "#FF0D0D" :
        depth < 90 && depth >= 70 ? "#FF4E11" :
        depth < 70 && depth >= 50 ? "#FF8E15" :
        depth < 50 && depth >= 30 ? "#FFB92E" :
        depth < 30 && depth >= 10 ? "#ACB334" :
                                    "#69B34C";
  }
  
// Setting up the legend
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = () => {
        var div = L.DomUtil.create('div', 'info legend');
        grades = [-10, 10, 30, 50, 70, 90];

        // Looping through our intervals and generating a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(myMap);

// Add legend to the map
legend.addTo(myMap);
  
  
  

  
 
