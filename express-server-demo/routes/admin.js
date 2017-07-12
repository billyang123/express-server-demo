var express = require('express');
var router = express.Router();

var data = require('../database/testdb');
router.get('/get', function(req, res, next) {
	M.article.find({},function (err, docs) {
		console.log(docs)
		if (err) {
	    res.json({success:1,'err':err});
	  }
		res.json({success:0,'article':docs});
	});
});
router.get('/add', function(req, res, next) {
	F.co(function *() {
		var result = yield M.category.create(data.Category)
		if(result) {
			res.json({success:0,user:result});
		}else{
			res.json({success:1,'msg':"更新失败"});
		}
	},res)
	/*M.users.create(data.Users,function (err, node, numAffected) {
		if (err) {
	    res.json({success:1,'err':err});
	  }
		res.json({success:0,'node':node});
	});*/
});
/*router.get('/addCategory', function(req, res, next) {
	var cate1 = new Category(cate);
	cate1.save(function (err, cateeee) {
		if (err) {
	    res.json({success:1,'err':err});
	  }
		res.json({success:0,'Category':cateeee});
	});
});
router.get('/getTags', function(req, res, next) {
	
	Category.find({},function (err, docs) {
		if (err) {
	    res.json({success:1,'err':err});
	  }
		res.json({success:0,'Tags':docs});
	});
});
router.get('/get', function(req, res, next) {
	
	Article.find({}).populate(["uID","cID","Tags"]).exec(function (err, docs) {
		if (err) {
	    res.json({success:1,'err':err});
	  }
		res.json({success:0,'data':docs});
	});
});
router.get('/addTags', function(req, res, next) {
	var tagsag = new Tags({
		name:"php",
		describe:"PHP（外文名:PHP: Hypertext Preprocessor，中文名：“超文本预处理器”）是一种通用开源脚本语言。语法吸收了C语言、Java和Perl的特点，利于学习，使用广泛，主要适用于Web开发领域。PHP 独特的语法混合了C、Java、Perl以及PHP自创的语法。它可以比CGI或者Perl更快速地执行动态网页。用PHP做出的动态页面与其他的编程语言相比，PHP是将程序嵌入到HTML（标准通用标记语言下的一个应用）文档中去执行，执行效率比完全生成HTML标记的CGI要高许多；PHP还可以执行编译后代码，编译可以达到加密和优化代码运行，使代码运行更快。"
	});
	tagsag.save(function (err, cateeee) {
		if (err) {
	    res.json({success:1,'err':err});
	  }
		res.json({success:0,'Tags':cateeee});
	});
});
router.get('/addPost', function(req, res, next) {
	var cate1 = new Article({
		title:"关于专栏文章",
		abstract: "SegmentFault 文章是面向中文开发者的高品质的技术学习与分享平台，任何人都可以创建属于自己的专栏。在这里",
		content:"原创的文章是自己学习和探索的结果，独立的思考会给他人更大的启发，会引导他人去发现、实现可能更加有趣的事。所以，如果是翻译或转载的文章，可以在文章标题最前面注明 [译] [转]，并在文章显要位置注明原作出处。",
		createTime:new Date(),
		updateTime:new Date(),
		click: 0,
		tags:["595ca12ba7ac801e700e2d4b","595ca1befaec350a50c141aa"],
		uID:"595c9506173dec27a81598f1",
		cID:"595c99e96b7e35296899fdb8"
	});
	cate1.save(function (err, cateeee) {
		if (err) {
	    res.json({success:1,'err':err});
	  }
		res.json({success:0,'Article':cateeee});
	});
});*/
module.exports = router;
