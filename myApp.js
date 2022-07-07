require("dotenv").config();
let express = require('express');
let app = express();

app.use('/public', express.static(__dirname + "/public"));

// app.get('/now', function (req, res, next) {
//     req.time = new Date().toString();
//     next();
// }, function (req, res) {
//     res.json({ time: req.time });
// });

app.get("/:word/echo", function (req, res) {
    res.json({ echo: req.params.word });
})

































 module.exports = app;
