const express = require("express");
const bodyParser = require("body-parser")

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/bmiCalculator.html")
})

app.post("/", (req, res) => {
    let weight = parseFloat(req.body.weight);
    // let weight = Number(req.body.weight);
    // let num2 = Number(req.body.weight);
    // let calcWeight = num1 * num2;

    // let height = Number(req.body.height);
    let height = parseFloat(req.body.height);
    let result = weight / (height * height);

    res.send("Your BMI is " + result)
})

app.listen(3000, () => "Server running on port 3000");