// Create variables for latitude and longitude
var lat;
var long;
var API_KEY = "ea65d5078c9656325666db7effe4ddf3";

// When the document is fully loaded initialize current weather
$(document).ready(function () {

    // Check if geolocation is avaiable
    if (navigator.geolocation) {
        console.log(navigator.geolocation);
        navigator.geolocation.getCurrentPosition(showPosition);
    }

    // Initialize google maps
    initMap();

});

function initMap() {

    // Load the variable coords
    var myLatLng = {
        lat: -35.2812958,
        lng: 149.1300
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 14,
        disableDoubleClickZoom: true,
    });

    // Update lat and long value of div when anywhere in the map is clicked
    google.maps.event.addListener(map, 'click', function (event) {
        lat = event.latLng.lat();
        long = event.latLng.lng();

        // Update the url
        openURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;
        console.log(openURL);

        // Run a new json search
        loadJson(openURL);
    });



}

function showPosition(position) {


    lat = position.coords.latitude;
    console.log(lat);
    long = position.coords.longitude;
    openURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;
    console.log(openURL);

    // Call JSON Loader
    loadJson(openURL);
}

function loadJson(url) {
    // Get the Json information
    $.getJSON(url, function (w) {

        // Assign the values
        // todo: FORMAT VALUES INTO READABLE FORMAT
        $(".main").text(w.weather[0].main);
        $(".id").text("(id:" + w.weather[0].id + ")");
        $(".wdescription").text(w.weather[0].description);
        $(".temperature").text(w.main.temp + "°C");
        $(".feels-like").text(w.main.feels_like + "°C");
        $(".temp-min").text(w.main.temp_min + "°C");
        $(".temp-max").text(w.main.temp_max + "°C");
        $(".pressure").text(w.main.pressure + "hpa");
        $(".humidity").text(w.main.humidity + "%");
        var visible = w.visibility / 100;
        $(".visibility").text(visible + "%");
        $(".windspeed").text(w.wind.speed + "m/s");
        $(".winddeg").text(w.wind.deg + "°");
        $(".cloud-density").text(w.clouds.all + "%");


        $(".daytime").text(convertTime(w.dt));
        $(".country").text(w.sys.country);
        $(".sunrise").text(convertTime(w.sys.sunrise));
        $(".sunset").text(convertTime(w.sys.sunset));
        $(".timezone").text(w.timezone);
        $(".city-id").text(w.id);
        $(".city-name").text(w.name);
        $(".weather-statement").text("It's " + parseInt(w.main.temp) + "°C " + "in " + w.name + " right now");

        var punchline;

        if (w.main.temp < -10) {
            punchline = "Jesus! It's ridculously cold today! You better stay inside and put some nice warm clothes on!";
        } else if (w.main.temp < -5) {
            punchline = "Now that's one of the coldest days i've heard of! you need to put some warm clothes on!";
        } else if (w.main.temp < 0) {
            punchline = "Okay now we are below 0! I think I'm going to freeze! Better sit by the fire and toast up some marshmellows";
        } else if (w.main.temp < 5) {
            punchline = "My gosh it's a bit cold today! I better hope it's winter where you are! Put some nice warm clothes on!";
        } else if (w.main.temp < 10) {
            punchline = "Yeesh! It's going to be a bit cold today! I hope you have a jacket ready!";
        } else if (w.main.temp < 15) {
            punchline = "It's pretty cold at the moment, maybe I suggest a jumper?";
        } else if (w.main.temp < 20) {
            punchline = "Now it's lookin' like this could serve up to be a good day!";
        } else if (w.main.temp < 25) {
            punchline = "Looks like it going to be a great day today! Better not stay inside!";
        } else if (w.main.temp < 30) {
            punchline = "My god it seems to be quite hot today! Better pack that sunscreen";
        } else if (w.main.temp < 35) {
            punchline = "Ouch! You can probably feel the heat already! Make sure to slip, slop and slap!";
        } else if (w.main.temp < 40) {
            punchline = "It's lookin' like it's a cold ice-cream day! Pack some sunscreen though!";
        } else if (w.main.temp < 45) {
            punchline = "Jesus! Its flamin' hot! Might be a good idea to stay indoors!";
        } else if (w.main.temp < 50) {
            punchline = "This has to be one of the hottest days on earth! Be safe and stay indoors!";
        }

        // Set the punchline
        $(".description-flavour").text(punchline);

        // Get the image
        var code = parseInt(w.weather[0].id / 100);
        switch (code) {
            case 2:
                // Thunderstorm
                $(".weather-icons").empty().prepend('<img class="weather-svg" src="/assets/weather-icons/thunder.svg" alt="" srcset="">');
                break;
            case 3:
                // Drizzle
                $(".weather-icons").empty().prepend('<img class="weather-svg" src="/assets/weather-icons/rainy-1.svg" alt="" srcset="">');
                break;
            case 5:
                // Rain
                $(".weather-icons").empty().prepend('<img class="weather-svg" src="/assets/weather-icons/rainy-4.svg" alt="" srcset="">');
                break;
            case 6:
                // Snow
                $(".weather-icons").empty().prepend('<img class="weather-svg" src="/assets/weather-icons/snowy-3.svg" alt="" srcset="">');
                break;
            case 7:
                // Atmosphere
                $(".weather-icons").empty().prepend('<img class="weather-svg" src="/assets/weather-icons/cloudy.svg" alt="" srcset="">');
                break;
            case 8:
                // Clear / Cloudy
                $(".weather-icons").empty().prepend('<img class="weather-svg" src="/assets/weather-icons/cloudy-day-1.svg" alt="" srcset="">');
                break;
        }

        // Post the image


    });
}

function convertTime(time) {
    var date = new Date(time * 1000);
    var hours = date.getHours();
    var mins = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ":" + mins.substr(-2) + ":" + seconds.substr(-2);
    return formattedTime;
}