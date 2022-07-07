let express = require('express');
let app = express();

app.use('/public', express.static(__dirname + "/public"));

app.get('/json', function (req, res) {
    res.json(JSON.stringify({ message: "Hello json" }));
});

































 module.exports = app;
