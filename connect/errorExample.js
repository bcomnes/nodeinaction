var connect = require('connect');

connect()
  .use(router(require('./routes/user')))
  .use(router(require('./routes/blog'))) // Skipped
  .use(router(require('./routes/admin'))) // Skipped
  .use(errorHandler());

connect()
  .use(function hello (req, res) {
    foo();
    res.setheader('Content-Type', 'text/plain');
    res.end('hello world');
  }).listen(3000);

  function errorHandler() {
    var env = process.env.NODE_ENV || 'development';
    return function (err, req, res, next) {

      res.statusCode = 500;
      switch (env) {
        case 'development':
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(err));
        break;
      default:
        res.end('server error');
      }
    };
  }