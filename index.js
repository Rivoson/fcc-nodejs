var express = require('express');
var cors = require('cors');
var fileUpload = require('express-fileupload')
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }
}))

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


app.post('/api/fileanalyse', function (req, res) {
  const files = req.files.upfile
  res.json({ name: files.name, type: files.mimetype, size: files.size })
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
