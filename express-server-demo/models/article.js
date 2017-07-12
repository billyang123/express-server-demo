module.exports = function (Schema) {
  return {  
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
		click: {type: Number,default:0},
		cover:String,
		comments:[{
				type : Schema.Types.ObjectId,
				ref : 'comment'
		}],
		tags:[{
				type : Schema.Types.ObjectId,
				ref : 'tags'
		}],
		user:{
			type : Schema.Types.ObjectId,
			ref : 'users'
		},
		category:{
			type : Schema.Types.ObjectId,
			ref : 'category'
		}
	};
}