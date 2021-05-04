
const express = require("express");
const https = require("https");

const app = express();
app.use(express.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req, res) {
    const city = req.body.city;
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&&appid=161a7809bedf88256b7fe3a7735f73d3#"

    https.get(url, function (response) {
        response.on("data", function (data) {
            const weather = JSON.parse(data);
            const climate = weather.weather[0].main;
            const temp = weather.main.temp;
            const windspeed = weather.wind.speed;
            const icon = "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png";


            res.write("<p>Climate is " + climate + " </p>");
            res.write("<h2>Temprature is " + temp + " </h2>");
            res.write("<p>Wind speed is " + windspeed + "</p>");
            res.write("<img src=" + icon + ">");
            res.send();
        });
    });
})

let port = process.env.PORT;
app.listen(port, function () {
    console.log("Server started at " + port);
})