var mongoose = require('mongoose');  
var Schema   = mongoose.Schema;  
  
//schema 就是如何定义数据的结构  
var userSchema = new mongoose.Schema({  
  account:String,
	password:String,
	name:String,
	posts:[{
			type : Schema.Types.ObjectId,
			ref : 'Article'
	}],
	joinTime:{
		type:Date,
		default:Date.now
	},
	email:String,
	isAdmin:{
		type:Boolean,
		default:false
	}
}); 
module.exports = userSchema