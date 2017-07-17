var express = require('express');
var router = express.Router();
/* dologin */
router.get('/query', function(req, res) {
  var query = req.query;
  F.co(function *() {
  	var article = yield M.article.find(query).sort({"updateTime":-1}).populate(['user','tags','category']).exec();
  	res.json({
      status: {
        code: 0,
        msg: ''
      },
      data:article
    })
  },res)
});
router.get('/day/query', function(req, res) {
  var query = req.query;

  var start = moment(query.startDay).format("YYYY-MM-DD");
  var end = moment(query.endDay).format('YYYY-MM-DD');
  console.log(start,end)
  F.co(function *() {
  	var article = yield M.article.find({
  		"$and":[
  			{"createTime":{"$gt":`${start} 00:00:00`}},
  			{"createTime":{"$lt":`${end} 23:59:59`}}
  		]
  	}).sort({"updateTime":-1}).populate(['user','tags','category']).exec();
  	res.json({
      status: {
        code: 0,
        msg: ''
      },
      data:article
    })
  },res)
});
router.get('/queryByKey', function(req, res) {
  var query = req.query;
  var fd = query.fd || "title";
  var sreacKeyRegExp = new RegExp(query.key);
  var params = {};
  params[fd] = sreacKeyRegExp;
  F.co(function *() {
  	var article = yield M.article.find(params).populate(['user','tags','category']).exec();
  	res.json({
      status: {
        code: 0,
        msg: ''
      },
      data:article
    })
  },res)
});
router.get('/query/:id', function(req, res) {
  var query = req.params;
  F.co(function *() {
  	var article = yield M.article.findOne({_id:query.id}).populate(['user','tags','category']).exec();
  	res.json({
      status: {
        code: 0,
        msg: ''
      },
      data:article
    })
  },res)
});
router.post('/add', function(req, res) {
  var query = req.body,article;
  console.log(query)
  	var _dbs = Object.assign({},query,{
		//user:ObjectID(query.user),
		tags:query.tags.split(",")
		//category:ObjectID(query.category)
	})
	console.log(_dbs)
  F.co(function *() {
  		if(article = yield M.article.create(_dbs)) {
			res.json({
				status: {
		          code: 0,
		          msg: '添加成功'
		        },
		        article:article
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