var express = require('express');
var router = express.Router();
var user = require('../database/db').user;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* login */
router.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});
/* dologin */
router.post('/login', function(req, res) {
	  var query = {name: req.body.name, password: req.body.password};
	  (function(){
			  user.count(query, function(err, doc){    //count返回集合中文档的数量，和 find 一样可以接收查询条件。query 表示查询的条件
					if(doc == 1){
						res.render('ucenter', { title:'ucenter' });
					}else{
						res.redirect('/');
					}
		  	});
	  })(query);
});
module.exports = router;
