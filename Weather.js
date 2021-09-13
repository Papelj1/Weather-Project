const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/weather.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
     const apiId = "2810749f6d4d6767d4c0158c88b9bed1";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiId;


    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const descr = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL =  "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            console.log(temp);
            console.log(descr);
            res.write("<h1>Temperature in " + query+ " is " +temp + "and  is " + descr + ". </h1>");
            res.write("<img src="+iconURL+">");
            res.send();
        });
    });
});

app.listen("3000", function () {
    console.log("Server is Running on port 3 tisuce");


});