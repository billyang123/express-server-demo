var express = require('express');
var router = express.Router();
var utilsFns = function(schema,action,body,res,pushObj){
	var post = {};
	F.co(function *() {
		if(action == "add"){
			for(var i=0;i< pushObj.length;i++){
				post[pushObj[i]] = body[pushObj[i]]
			}
			post.id = getUID('admin');
			if(yield M[schema].create(post)){
				res.json({
					status: {
	          code: 0,
	          msg: '添加成功'
	        }
				});
			}else{
				res.json({
					status: {
	          code: -1,
	          msg: '添加失败'
	        }
				});
			}
		} else if (action == 'update'){
			for(var i=0;i< pushObj.length;i++){
				post[pushObj[i]] = body[pushObj[i]]
			}
			if(yield M[schema].update({id:body.id},{$set:post})) {
				res.json({
					status: {
	          code: 0,
	          msg: '修改成功'
	        }
				});
			}else{
				res.json({
					status: {
	          code: -1,
	          msg: '修改失败'
	        }
				});
			}
		}else if(action == "delete"){
			if(yield M[schema].remove({id:body.id})) {
				res.json({
					status: {
	          code: 0,
	          msg: '删除成功'
	        }
				});
			}else{
				res.json({
					status: {
	          code: -1,
	          msg: '删除失败'
	        }
				});
			}
		}

  },res)
}
router.get('/category', function(req, res) {
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
router.get('/article', function(req, res) {
	var query = req.query;
	U.Pagination({
		pagin:{
			currentPage:query.currentPage,
			pageSize:query.pageSize
		},
		sort:{"updateTime":-1},
		populate:['user','tags','cate']
	},'article',function(d){
		res.json(d)
	},res)
  // F.co(function *() {
  // 	var article = yield M.article.find(query);
	// 	console.log(article.length);
  // 	res.json({
  //     status: {
  //       code: 0,
  //       msg: ''
  //     },
  //     data:article
  //   })
  // },res)
})
router.post('/article/:action', function(req, res) {
	F.co(function *() {
		var body = req.body;
		var action = req.params.action;
		var result = null;
		console.log(body,action);
		switch (action) {
			case 'online':
				result = yield M.article.update({id:body.id},{$set:{online:true}})
				break;
			case 'offline':
				result = yield M.article.update({id:body.id},{$set:{online:false}})
				break;
			case 'delete':
				result = yield M.article.remove({id:body.id})
				break;
			default:
				result = null
				break;
		}
		res.json({
			data:result,
			status: {
				code: 0,
				msg: '设置成功'
			}
		});
	},res)
})
router.post('/category/:action', function(req, res) {
	var body = req.body;
	var action = req.params.action;
	var post = {}
  utilsFns('category',action,body,res,['name','describe'])
})
router.get('/tags', function(req, res) {
	var query = req.query;
	F.co(function *() {
	 var tags = yield M.tags.find(query);
	 res.json({
			status: {
				code: 0,
				msg: ''
			},
			data:tags
		})
	},res)
})
router.post('/tags/:action', function(req, res) {
	var body = req.body;
	var action = req.params.action;
	var post = {}

  utilsFns('tags',action,body,res,['name','describe'])
})
router.get('/article', function(req, res) {
	var query = req.query;
  F.co(function *() {
  	var article = yield M.article.find(query).populate(['user','tags','cate']).exec();;
  	res.json({
      status: {
        code: 0,
        msg: ''
      },
      data:article
    })
  },res)
})
router.get('/comment', function(req, res) {
	var query = req.query;
  F.co(function *() {
  	var comment = yield M.comment.find(query);
  	res.json({
      status: {
        code: 0,
        msg: ''
      },
      data:comment
    })
  },res)
})
router.get('/medias', function(req, res) {
	var query = req.query;
	F.co(function *() {
	 var medias = yield M.medias.find(query);
	 res.json({
			status: {
				code: 0,
				msg: ''
			},
			data:medias
		})
	},res)
})

router.get('/users', function(req, res) {
	var query = req.query;
	F.co(function *() {
	 var tags = yield M.users.find(query);
	 res.json({
			status: {
				code: 0,
				msg: ''
			},
			data:users
		})
	},res)
})
module.exports = router;
