// map.js

// Initialize the map with custom CRS
var map = L.map('map', {
    crs: L.CRS.Simple
});
var bounds = [[0, 0], [5.5, 7]];
var image = L.imageOverlay('img/EnnonKaart.jpg', bounds).addTo(map);
map.fitBounds(bounds);

// Object to store custom marker icons
var markerIcons = {};

// Load marker types from JSON
fetch('/DnD-Campaign-Map/json/markerTypes.json')
    .then(response => response.json())
    .then(data => {
        for (const [key, value] of Object.entries(data)) {
            markerIcons[key] = L.ExtraMarkers.icon(value);
        }
    })
    .catch(error => console.error('Error fetching marker types:', error));

// Function to add markers from JSON data
function addMarkersFromJSON(data) {
    // Clear existing markers
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Add new markers
    data.markers.forEach(markerData => {
        const { title, description, coordinates, markerType } = markerData;
        const marker = L.marker(coordinates, { icon: markerIcons[markerType] }).addTo(map);
        marker.bindPopup(`<b>${title}</b><br>${description}`);
    });
}

// Function to load markers based on the day
function loadMarkers(day) {
    fetch(`/DnD-Campaign-Map/json/ennon/dag${day}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => addMarkersFromJSON(data))
        .catch(error => console.error('Error fetching data:', error));
}
