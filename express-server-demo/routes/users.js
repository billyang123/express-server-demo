var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
				req.session.user = {
          id: user._id,
          avator: user.avator,
          name: user.name,
          email: user.email
        };
			}else{
				code = 1;
				msg = "用户名或密码错误";
			}
			res.json({
        status: {
          code: code,
          msg: msg
        }
      })
		} else if (query.action === 'out') {
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
