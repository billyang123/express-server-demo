var fs = require('fs');
var path = require("path");
function findSync(startPath) {
    var result=[];
    function finder(path) {
        var files=fs.readdirSync(path);
        files.forEach((val,index) => {
            //var fPath=join(path,val);
            var fPath = `${path}/${val}`;
            var stats=fs.statSync(fPath);
            if(stats.isDirectory()) finder(fPath);
            if(stats.isFile()) result.push(fPath);
        });

    }
    finder(startPath);
    return result;
}
function deleteFolderRecursive(url) {
  var files = [];
  console.log(url);
  //判断给定的路径是否存在
  if( fs.existsSync(url) ) {
    //返回文件和子目录的数组
    files = fs.readdirSync(url);
    files.forEach(function(file,index){
      // var curPath = url + "/" + file;
      var curPath = path.join(url,file);
      //fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
      if(fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      // 是文件delete file
      } else {
        fs.unlinkSync(curPath);
      }
    });
    //清除文件夹
    fs.rmdirSync(url);
  }else{
    console.log("给定的路径不存在，请给出正确的路径");
  }
};
function Pagination(query,Todo,callback,res){
	F.co(function *() {
		var pagin = {};
		var TODOModel = null;
		var data = null;
		if(query.params) query.params = {};
		TODOModel = M[Todo].find(query.params)
		if(query.sort){
			TODOModel = TODOModel.sort(query.sort)
		}
		if(query.pagin){
			pagin.total = yield M[Todo].count({});
			pagin.currentPage = parseInt(query.pagin.currentPage,10);
			pagin.pageSize = parseInt(query.pagin.pageSize,10) || 10;
      console.log(pagin.currentPage,pagin.pageSize);
			TODOModel = TODOModel.skip((pagin.currentPage-1)*pagin.pageSize).limit(pagin.pageSize)
		}
		if(query.populate){
			TODOModel = TODOModel.populate(query.populate)
		}
		data = yield TODOModel.exec()
		callback({
			status: {
				code: 0,
				msg: ''
			},
			pagin:pagin,
			data:data
		})
	},res)
}
module.exports = {
	findSync,
  deleteFolderRecursive,
  Pagination
}
