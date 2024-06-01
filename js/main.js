// main.js

document.addEventListener("DOMContentLoaded", function () {
    var slider = document.getElementById("dayRange");
    var output = document.getElementById("sliderValue");
    output.innerHTML = "Dag " + slider.value;

    slider.oninput = function () {
        output.innerHTML = "Dag " + this.value;
        loadMarkers(this.value);
    }

    // Initial load
    loadMarkers(slider.value);
});
