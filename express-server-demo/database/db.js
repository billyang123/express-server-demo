var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/notework');//；连接数据库
exports.Users = db.model('Users', require('./users'));
exports.Article = db.model('Article', require('./article'));
exports.Category = db.model('Category', require('./category'));
exports.Tags = db.model('Tags', require('./tags'));
exports.Comment = db.model('Comment', require('./comment'));