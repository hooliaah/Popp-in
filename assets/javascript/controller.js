// GLOBAL VARIABLE
var loc;

// search for city, return lat and long (used in maps.js and weather.js) + city name (used in sports.js)
$("#submit").on("click", function (e) {
    e.preventDefault();
    var city = $("#search").val().trim();
    if ((city).match(/[a-zA-Z]/)) {
        // $.getJSON is a method to get JSON data using an AJAX HTTP GET request
        // google geocode api is used for converting addresses
        // encodeURIComponent means it takes out any special characters
        $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDT0pl0hd2be_OexuR7fo5y2yls9vTpQ9U&address=" + encodeURIComponent(city), function (val) {
            console.log(val);
            if (val.results.length) {
                loc = val.results[0].geometry.location
                weather();
                initMap();
                console.log("weather and map called");
            }
            var location = $("#search").val().trim();
            searchNews(location);
        })
    } else {
        Materialize.toast('Please enter a city name!', 4000) // 4000 is the duration of the toast
    }
})