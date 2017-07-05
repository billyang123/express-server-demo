var mongoose = require('mongoose');  
var Schema   = mongoose.Schema;  
  
//schema 就是如何定义数据的结构  
var articleSchema = new mongoose.Schema({  
  title:String,
	abstract: String,
	content:String,
	createTime:{
		type:Date,
		default:Date.now
	},
	updateTime:{
		type:Date,
		default:Date.now
	},
	click: {type: Number},
	comments:[{
			type : Schema.Types.ObjectId,
			ref : 'Comment'
	}],
	tags:[{
			type : Schema.Types.ObjectId,
			ref : 'Tags'
	}],
	user:{
		type : Schema.Types.ObjectId,
		ref : 'Users'
	},
	category:{
		type : Schema.Types.ObjectId,
		ref : 'Category'
	}
}); 
module.exports = articleSchema