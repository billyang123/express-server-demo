var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/notework');//；连接数据库
exports.Users = db.model('Users', require('./model/users'));
exports.Article = db.model('Article', require('./model/article'));
exports.Category = db.model('Category', require('./model/category'));
exports.Tags = db.model('Tags', require('./model/tags'));
exports.Comment = db.model('Comment', require('./model/comment'));

