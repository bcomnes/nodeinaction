var connect = require('connect');

var app = connect()
  .use(connect.bodyParser())
  .use(function (req, res) {
    console.log(req.body);
    console.log(req.files);
    res.end('thanks');
  }).listen(3000);