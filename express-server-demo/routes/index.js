var express = require('express');
var router = express.Router();
/* dologin */
router.get('/queryTags', function(req, res) {
  var query = req.query;
  var sreacKeyRegExp = new RegExp(query.key);
  F.co(function *() {
  	var tags = yield M.tags.find({name:sreacKeyRegExp});
  	res.json({
      status: {
        code: 0,
        msg: ''
      },
      data:tags
    })
  },res)
});
router.get('/', function(req, res) {
  res.type('html')
  res.header("Content-Type", "text/html");
  res.render('index', {title: "点滴"});
});
module.exports = router;
