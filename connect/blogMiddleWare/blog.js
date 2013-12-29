var connect = require('connect');
var url = require('url');
var app = connect()
  .use(rewrite)
  .use(showPost)
  .listen(3000);

