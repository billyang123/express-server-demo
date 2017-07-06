var express = require('express');
var router = express.Router();
var user = require('../database/db').user;
/* dologin */
router.post('/login', function(req, res) {
  var query = {name: req.body.name, password: req.body.password};
  user.count(query, function(err, doc){
  	console.log(doc)
  	if(doc == 1){
			res.json({
				status:0
			})
		}else{
			res.json({
				status:1,
				msg:"用户名或密码错误"
			})
		}
  })
});
module.exports = router;
