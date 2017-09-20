module.exports = function (Schema) {
  return {
    id:String,
    localPath: {
			type:String,
			default:''
		},
    path: String,
    date: {
			type:Date,
			default:Date.now
		},
    info: String
	}
}
