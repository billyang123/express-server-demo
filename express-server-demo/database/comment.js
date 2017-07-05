var mongoose = require('mongoose');  
var Schema   = mongoose.Schema;  
  
//schema 就是如何定义数据的结构  
var CommentSchema = new Schema({
    article: { type: Schema.Types.ObjectId, ref: "Article" },
    user : { type: Schema.Types.ObjectId, ref: 'Users' },
    content : String,
    date: {
			type:Date,
			default:Date.now
		}
});
module.exports = CommentSchema