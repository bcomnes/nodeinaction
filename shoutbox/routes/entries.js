var Entry = require('../lib/entry');

exports.form = function(req, res){
  res.render('post', { title: 'Post' });
};

exports.list = function (req, res, next) {
  var page = req.page;
  Entry.getRange(page.from, page.to, function (err, entries) {
    if (err) return next (err);

    res.render('entries', {
      title: 'Entries',
      entries: entries,
    });
  });
};

exports.submit = function (req, res, next) {
  var data = req.body.entry;

  console.log(res);

  var entry = new Entry({
    'username': res.locals.user.name,
    'title': data.title,
    'body': data.body
  });

  entry.save(function (err) {
    if (err) return next(err);
    res.redirect('/');
  });
};
