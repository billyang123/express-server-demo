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
	};
}