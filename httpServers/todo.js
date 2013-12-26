var http = require('http');
var url = require('url');
var items = [];

var server = http.createServer(function (req, res) {
  switch (req.method) {
    case 'POST':
      var item = '';
      req.setEncoding('utf8');
      req.on('data', function (chunk) {
        item += chunk;
      });
      req.on('end', function () {
        items.push(item);
        res.end('OK\n');
      });
    break;
    case 'GET':
      var body = items.map(function (item, i) {
        return i + ') ' + item;
      }).join('\n');
      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.setHeader('Content-Type', 'text/plaint; charset="utf-8"');
      res.end(body);
    break;
    case 'DELETE':
      var i = getNumber(req.url);

      if (isNaN(i)) {
        res.statusCode = 400;
        res.end('Invalid item id');
      } else if (!items[i]) {
        res.statusCode = 404;
        res.end('Item not found');
      } else {
        items.splice(i, 1);
        res.end('OK\n');
      }
    break;
    case 'PUT':
      var j = getNumber(req.url);

      if (isNaN(j)) {
        res.statusCode = 400;
        res.end('Invalid item id');
      } else if (!items[j]) {
        res.statusCode = 404;
        res.end('Item not found');
      } else {
        var itemUpdate = '';
        req.setEncoding('utf8');
        req.on('data', function (chunk) {
          itemUpdate += chunk;
        });
        req.on('end', function () {
          items[j] = itemUpdate;
        res.end('OK\n');
      });
      }
  }
});

function getNumber (itemURL) {
  var path = url.parse(itemURL).pathname;
  var itemNumber = parseInt(path.slice(1), 10);
  return itemNumber;
}

server.listen(3000);