const duckMap = L.map("duck-map").setView([51.197739, -1.903253], 2);

const duckIcon = L.icon({
  iconUrl: "Plastic-model-duck-icon.png",
  iconSize: 30,
});

const loadingMsg = "Please wait while the ducks load...";

const publicSpreadsheetUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS01Bk0l6EPXe3FQmmppTpvTb1SgiYuHHytf1ywUMaLR5bpIRBrbXFaN7XkpjZOGueiZ54oduMsEvQs/pub?gid=198631329&single=true&output=csv";

const markers = L.markerClusterGroup({ disableClusteringAtZoom: 17 });

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
    tileSize: 512,
    zoomOffset: -1,
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken:
      "pk.eyJ1Ijoid2ViZGV2cmljaCIsImEiOiJjazNzazR4MHQwNzhxM25tbmswd2I5eWVmIn0.0mQyGSHfgYMP6phzW323sQ",
  }
).addTo(duckMap);

function init() {
  Papa.parse(publicSpreadsheetUrl, {
    download: true,
    header: true,
    complete: showInfo,
  });
}

function showInfo(results) {
  const { data, errors } = results;
  for (const i in data) {
    const marker = L.marker([data[i].Lat, data[i].Lng], {
      title: data[i]["Duck name"],
      icon: duckIcon,
    });
    marker.bindPopup(
      `<h3>${data[i]["Duck name"]}</h3>` +
        `<strong>Date logged:</strong> ${data[i]["Date logged"]}<br>` +
        `<strong>Location:</strong> ${data[i].Location}<br>` +
        `<strong>Found by:</strong> ${data[i]["Found by"]}<br>` +
        `<strong>Comments:</strong> ${data[i].Comments}<br>` +
        `<strong>Lat:</strong> ${data[i].Lat} <strong>Long:</strong> ${data[i].Lng}<br>` +
        `<strong>Photo link:</strong> ` +
        `<a href="${data[i]["Photo link"]}" target="_blank">${data[i]["Photo link"]}</a>`
    );

    markers.addLayer(marker);
  }
}

duckMap.addLayer(markers);

markers.on("add", function (e) {
  alert(e.type, "Map added.");
});

window.addEventListener("DOMContentLoaded", init);
