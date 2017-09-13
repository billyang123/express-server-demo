module.exports = function (Schema) {
  return {
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
    hobby:String,
    motto:String,
    selfAssessment:String,
    profession:String,
    QQ:String,
		email:String,
		avator:String,
		isAdmin:{
			type:Boolean,
			default:false
		},
		level:{
			type:Number,
			default:0
		}
	}
}
