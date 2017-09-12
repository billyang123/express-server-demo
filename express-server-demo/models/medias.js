module.exports = function (Schema) {
  return {
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
