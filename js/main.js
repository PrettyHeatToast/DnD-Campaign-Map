// main.js

var slider = document.getElementById("dayRange");
var output = document.getElementById("sliderValue");
output.innerHTML = "Dag " + slider.value;

slider.oninput = function () {
    output.innerHTML = "Dag " + this.value;
    loadMarkers(this.value);
};

function loadMarkers(day) {
    fetch(`/json/ennon/dag${day}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => addMarkersFromJSON(data))
        .catch(error => console.error('Error fetching data:', error));
}

// Initial load
loadMarkers(slider.value);
