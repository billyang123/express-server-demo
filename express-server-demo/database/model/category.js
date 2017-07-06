var mongoose = require('mongoose');  
var Schema   = mongoose.Schema;  
  
//schema 就是如何定义数据的结构  
var categorySchema = new Schema({
	name:String,
	describe:String
})
module.exports = categorySchema