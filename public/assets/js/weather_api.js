$(document).ready(function () {
    var weatherKey = "c42a7fcea0bcaffcf54bbbca1199417e";
    var weather = $("#weather");

    var resultsNum = 1;
    var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=Berlin,de,de&appid=" +
        weatherKey;

    console.log(weather)

    fetch(queryURL)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            weather.text(myJson.weather[0].description)
            $(".weather-box").append(weather)
            console.log(myJson.weather[0].description);
        });
});

