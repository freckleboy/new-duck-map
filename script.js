const duckMap = L.map('duck-map').setView([51.197739, -1.903253], 2);

const duckIcon = L.icon({iconUrl: 'Plastic-model-duck-icon.png'});

const loadingMsg = 'Please wait while the ducks load...';

const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1-Cdx1pmsxEx3nNdWQei-hiDqkxabNI6W3qZVIvd8vFE/edit?usp=sharing';

const markers = L.markerClusterGroup({disableClusteringAtZoom: 17});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  accessToken: 'pk.eyJ1Ijoid2ViZGV2cmljaCIsImEiOiJjazQxaXNjY3QwMXFwM2Vxcjd3dmh5NjJsIn0.lXktNhvx1mMfXlihsHZINQ'
}).addTo(duckMap);

function init() {
  Tabletop.init({ key: publicSpreadsheetUrl,
                  callback: showInfo,
                  simpleSheet: true,
                  error: errHandler,
                  // postProcess: createMarkers
                })
}

function showInfo(data, tabletop) {
  for (var i in data) {
    const marker = L.marker([data[i]["Lat"], data[i]["Lng"]],
                        {
                          title: data[i]["Duck name"],
                          icon: duckIcon
                        });
    marker.bindPopup(
      '<h3>' + data[i]["Duck name"] + '</h3>' +
      '<strong>Date logged:</strong> ' + data[i]["Date logged"] + '<br>' +
      '<strong>Location:</strong> ' + data[i]["Location"] + '<br>' +
      '<strong>Found by:</strong> ' + data[i]["Found by"] + '<br>' +
      '<strong>Comments:</strong> ' + data[i]["Comments"] + '<br>' +
      '<strong>Lat:</strong> ' + data[i]["Lat"] + ' <strong>Long:</strong> ' + data[i]["Lng"] + '<br>' +
      '<strong>Photo link:</strong> ' + '<a href="' + data[i]["Photo link"] + '" target="_blank">' + data[i]["Photo link"] + '</a>'
    );

    markers.addLayer(marker);
  }
}

duckMap.addLayer(markers);

markers.on('add', function(e) {
  alert(e.type, "Map added.");
});

function errHandler(element) {
  console.log("Error: ", element["lat"], element["lng"]);
}

window.addEventListener('DOMContentLoaded', init);
