var express = require('express');
var router = express.Router();
/* dologin */
router.get('/query', function(req, res) {
	var query = req.query;
  F.co(function *() {
  	var category = yield M.category.find(query);
  	res.json({
      status: {
        code: 0,
        msg: ''
      },
      data:category
    })
  },res)
})
module.exports = router;
