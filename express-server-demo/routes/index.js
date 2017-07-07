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
module.exports = router;
