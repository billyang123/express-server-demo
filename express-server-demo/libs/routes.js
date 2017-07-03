var fileName = "routes";


var routesPath = `../${fileName}`;
var utils= require('./utils');

//默认文件路由
var fp = utils.findSync(`./${fileName}`);
var fpTh = {};
fp.forEach((val,index)=>{
	var sds = val.split(fileName)[1].split('.js')[0];
	fpTh[sds] = sds;
})

//自定义路由-优先级高
var path = {
	'/':'/index',
	'/users':'/users'
}
path = Object.assign({},fpTh,path);
function setInit(obj){
	var result = {};
	for(var key in obj){
		result[key] = require(routesPath+obj[key]);
	}
	return result;
}
module.exports = setInit(path)