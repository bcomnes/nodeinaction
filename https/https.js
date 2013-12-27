var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('./key.pem')
}