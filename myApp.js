require("dotenv").config();
let express = require('express');
let bodyParser = require('body-parser');
let app = express();

app.use('/public', express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/now', function (req, res, next) {
//     req.time = new Date().toString();
//     next();
// }, function (req, res) {
//     res.json({ time: req.time });
// });

// app.get("/:word/echo", function (req, res) {
//     res.json({ echo: req.params.word });
// })

const handle = function (req, res) {
    res.json({ name: `${req.body.first} ${req.body.last}` });
}

app.route("/name").get(handle).post(handle);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

































 module.exports = app;
