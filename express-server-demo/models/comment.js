module.exports = function (Schema) {
  return {
    id:String,
    article: { type: Schema.Types.ObjectId, ref: "Article" },
    user : { type: Schema.Types.ObjectId, ref: 'Users' },
    content : String,
    date: {
			type:Date,
			default:Date.now
		}
	}
}
