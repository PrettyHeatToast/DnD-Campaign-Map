// Function to get URL parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '(=([^&#]*)|&|#|$)');
    var results = regex.exec(location.search);
    if (!results) {
        // Handle cases like `?day3`
        var altRegex = new RegExp('[\\?&]' + name + '(\\d+)');
        results = altRegex.exec(location.search);
        if (!results) return null;
        return results[1];
    }
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Select the slider and output elements
var slider = document.getElementById("dayRange");
var output = document.getElementById("sliderValue");

// Get the 'day' parameter from the URL
var dayParam = getUrlParameter('day');
var initialDay = (dayParam !== null && !isNaN(dayParam)) ? parseInt(dayParam, 10) : parseInt(slider.value, 10);

// Set the initial slider value
slider.value = initialDay;
output.innerHTML = "Dag " + initialDay;

// Update the displayed value and load markers when the slider is moved
slider.oninput = function () {
    output.innerHTML = "Dag " + this.value;
    loadMarkers(this.value);
};

// Load markers based on the initial slider value
loadMarkers(initialDay);

// Add event listener for the share button
document.getElementById("shareButton").addEventListener("click", function () {
    var currentDay = slider.value;
    var shareableUrl = window.location.origin + window.location.pathname + "?day=" + currentDay;
    navigator.clipboard.writeText(shareableUrl).then(function() {
        alert("Shareable URL copied to clipboard: " + shareableUrl);
    }, function(err) {
        console.error("Could not copy text: ", err);
    });
});