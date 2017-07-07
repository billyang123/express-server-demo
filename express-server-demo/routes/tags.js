var express = require('express');
var router = express.Router();
/* dologin */
router.get('/query', function(req, res) {
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
router.post('/add', function(req, res) {
  var query = req.body,tag;
  F.co(function *() {
  	if(tag = yield M.tags.create(query)) {
			res.json({
				status: {
          code: 0,
          msg: '添加成功'
        },
        tag:tag
			});
		}else{
			res.json({
				status: {
          code: 1,
          msg: '添加失败，请联系管理员'
        }
			});
		}
  },res)
});
module.exports = router;