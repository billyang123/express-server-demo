
exports.Users = {
	account:"Admin-ybb",
	password:F.encrypt("ybb7060093"),
	name:"管理员-ybb",
	joinTime:new Date(),
	email:"yangbinbin_1226@126.com",
	isAdmin:true
};
exports.Article = {
	title:"关于专栏文章",
	abstract: "SegmentFault 文章是面向中文开发者的高品质的技术学习与分享平台，任何人都可以创建属于自己的专栏。在这里",
	content:"原创的文章是自己学习和探索的结果，独立的思考会给他人更大的启发，会引导他人去发现、实现可能更加有趣的事。所以，如果是翻译或转载的文章，可以在文章标题最前面注明 [译] [转]，并在文章显要位置注明原作出处。",
	createTime:new Date(),
	updateTime:new Date(),
	click: 0
};
exports.Category = {
	name:"web前端开发",
	describe:"探索的结果，独立的思考会给他人更"
};
exports.Tags = {
	name:"php",
	describe:"PHP（外文名:PHP: Hypertext Preprocessor，中文名：“超文本预处理器”）是一种通用开源脚本语言。语法吸收了C语言、Java和Perl的特点，利于学习，使用广泛，主要适用于Web开发领域。PHP 独特的语法混合了C、Java、Perl以及PHP自创的语法。它可以比CGI或者Perl更快速地执行动态网页。用PHP做出的动态页面与其他的编程语言相比，PHP是将程序嵌入到HTML（标准通用标记语言下的一个应用）文档中去执行，执行效率比完全生成HTML标记的CGI要高许多；PHP还可以执行编译后代码，编译可以达到加密和优化代码运行，使代码运行更快。"
};
exports.Comment = {
	content: "pinlces是多少",
  date: new Date()
};

