var express = require('express');
var router = express.Router();

router.get('/list', function(req, res, next) {
  F.co(function *() {
    var users = yield M.users.find({});
    res.json({
      status:{
        code:0
      },
      users:users
    })
  })
});
router.post('/mine', function(req, res, next) {
  console.log(req.session.user);
  F.co(function *() {
    var user = yield M.users.findOne({_id:req.cookies.userId})
    res.json({
      status:{
        code:0
      },
      users:user
    })
  })
});
router.post('/auth/:action', function(req, res, next) {
 	F.co(function *() {
 		var action = req.params.action;
 		var user,code,msg,query,post;
		if(action == 'in'){
			query = {
	 			account: req.body.account,
	 			password: F.encrypt(req.body.password)
	 		};
			if(user = yield M.users.findOne(query)){
				code = 0;
				msg = "登录成功";
        if(!req.session.user){
          req.session.user = {}
        }
        var s_user = {
          id: user._id,
          avator: user.avator,
          name: user.name,
          email: user.email,
          isAdmin:user.isAdmin,
          joinTime:user.joinTime,
          account:user.account
        };
				req.session.user[user._id] = s_user
			}else{
				code = 1;
				msg = "用户名或密码错误";
			}
			res.json({
        status: {
          code: code,
          msg: msg,
        },
        user:code===0?s_user:null
      })
		} else if (action === 'out') {
      req.session.admin = null;
      res.json({
        status: {
          code: 0,
          msg: '登出成功'
        }
      })
    } else if(action == "add") {
    	post = {
	 			account: req.body.account,
	 			password: F.encrypt(req.body.password),
	 			name:req.body.name,
	 			email:req.body.email,
				avator:req.body.avator,
	 		};

			if(yield M.users.create(post)) {
				res.json({
					status: {
	          code: 0,
	          msg: '注册成功'
	        }
				});
			}else{
				res.json({
					status: {
	          code: 1,
	          msg: '注册失败，请联系管理员'
	        }
	      })
			}
    }else if(action == "update"){
      post = {
	 			name:req.body.name,
	 			email:req.body.email,
				avator:req.body.avator,
	 		};
			if(yield M.users.update(post)) {
				res.json({
          user:post,
					status: {
	          code: 0,
	          msg: '修改成功'
	        }
				});
			}else{
				res.json({
					status: {
	          code: 1,
	          msg: '修改失败，请联系管理员'
	        }
	      })
			}
    }else{
    	res.json({
			status: {
	          code: -1,
	          msg: '参数出错，请联系管理员'
	        }
	      })
    }
	},res)
});
module.exports = router;
