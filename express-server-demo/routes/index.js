var express = require('express');
var router = express.Router();
var user = require('../database/db').user;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* login */
router.get('/login', function(req, res) {
	console.log("login")
    res.render('login', { title: 'login' });
});
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
