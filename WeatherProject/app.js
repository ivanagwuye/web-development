const { response } = require("express");
const express = require("express");
const bodyParser = require("body-parser")
const https = require("node:https");
const { request } = require("node:http");

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (require, response) => {
    response.sendFile(__dirname + "/index.html")

})

app.post("/", (request, response) => {
        const query = request.body.cityName;
        const appid = "24781bea0609e73f0230640c25b91a6e";
        const unit = "metric";

        const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ unit +"&appid="+ appid +"";
        https.get(url, (res) => {
        console.log(res.statusCode);

        res.on('data', (data) => {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const icon = weatherData.weather[0].icon;
        const imageURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png";
        const description = weatherData.weather[0].description;

        response.write("The temperature in "+ query +" is " + temp + " degrees.");
        response.write("The description is " + description);
        response.write("<img src="+ imageURL +">");
        response.send();
        })
        })
})



app.listen(3000, () => console.log("Server is running on port 3000"))