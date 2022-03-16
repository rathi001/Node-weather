
const express = require("express");
const https = require("https");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/health", function (req, res) {
    res.sendStatus(200);
});
app.get("/", function (req, res) {
    res.render("index");

});

app.post("/", function (req, res) {
    const city = req.body.city;
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&&appid=161a7809bedf88256b7fe3a7735f73d3#"

    https.get(url, function (response) {
        response.on("data", function (data) {
            const weather = JSON.parse(data);
            if (weather.cod != 200) {
                res.render("index");
                return;
            }
            const climate = weather.weather[0].main;
            const temp = weather.main.temp;
            const windspeed = weather.wind.speed;
            const icon = "http://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png";

            res.render("weather", { icon: icon, temp: temp, climate: climate, windspeed: windspeed });
        });
    });
})

let port = process.env.PORT || 80;
app.listen(port, function () {
    console.log("Server started at " + port);
})
