var redis = require('redis');
var db = redis.createClient();

module.exports = Entry;

function Entry(obj) {
  for (var key in obj) {
    this[key] = obj[key];
  }
}

Entry.prototype.save = function(fn) {
  var entryJSON = JSON.stringify(this);

  db.lpush(
    'entries',
    entryJSON,
    function (err) {
      if (err) return fn (err);
      fn();
    }
  );
};