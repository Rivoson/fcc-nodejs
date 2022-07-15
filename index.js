require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: false }));

let urls = [];

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/shorturl/:number", function (req, res) {
  const number = req.params.number;
  if (isNaN(Number(number)) || Number(number) <= 0 || Number(number) > urls.length)
    res.json({ error: "No short URL found for the given input" });
  else
    res.redirect(urls[number - 1]);
});

app.route("/api/shorturl")
  .get(function (_, res) {
    res.json({ original_url: urls[urls.length - 1], short_url: urls.length });
  })
  .post(function (req, res) {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!regex.test(req.body.url)) res.json({ error: "Invalid URL" });
    else {
      urls.push(req.body.url);
      res.redirect("/api/shorturl");
    }
  });

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
