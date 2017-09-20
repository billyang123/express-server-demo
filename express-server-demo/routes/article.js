var express = require('express');
var router = express.Router();
/* dologin */
router.get('/query', function(req, res) {
  var query = req.query;
  F.co(function *() {
  	var article = yield M.article.find(query).sort({"updateTime":-1}).populate(['user','tags','cate']).exec();
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
  var id = req.params.id;
  F.co(function *() {
    console.log(id);
  	var article = yield M.article.find({_id:id}).populate(['user','tags','cate']).exec();
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
  	}).sort({"updateTime":-1}).populate(['user','tags','cate']).exec();
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
  	var article = yield M.article.find(params).populate(['user','tags','cate']).exec();
  	res.json({
      status: {
        code: 0,
        msg: ''
      },
      data:article
    })
  },res)
});

router.post('/write/:action', function(req, res) {
  var query = req.body,article;
  var action = req.params.action;
  var _dbs = Object.assign({},query,{
		//user:ObjectID(query.user),
		tags:query.tags.split(",")
		//category:ObjectID(query.category)
	})
  F.co(function *() {
    var article = null;
    if(action == "add"){
      _dbs.id =  getUID(_dbs.user);
      article = yield M.article.create(_dbs);
    }else if(action == "update"){
      var id =  _dbs.id;
      delete _dbs.id
      console.log(_dbs);
      article = yield M.article.update({id:id},{$set:_dbs});
    }else{

    }
    if(article){
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
