// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
  let unix = 0;
  let utc = "";

  if (isNaN(Number(req.params.date))) {
    if (new Date(req.params.date) == "Invalid Date") {
      res.json({ error: "Invalid Date" });
      return;
    }

    unix = new Date(req.params.date).getTime();
    utc = new Date(req.params.date).toGMTString();
  } else {
    unix = Number(req.params.date);
    utc = new Date(Number(req.params.date)).toGMTString();
  }

  return res.json({ unix, utc });
});

app.get("/api", function (_, res) {
  res.json({ unix: new Date(Date.now()).getTime(), utc: new Date(Date.now()).toGMTString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
