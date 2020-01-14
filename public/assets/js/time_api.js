var timeKEY = "YUC9ABL0FP24";
var time = $("#time");

$(document).ready(function () {
    var queryURL =
        "http://api.timezonedb.com/v2.1/get-time-zone?key=" +
        timeKEY +
        "&format=json&by=zone&zone=Europe/Berlin";

    fetch(queryURL)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log("time", myJson)
            time.text(myJson.formatted)
            $(".time-box").append(time)
            console.log(myJson.formatted);
        });
});