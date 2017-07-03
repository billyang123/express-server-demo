var fs = require('fs');
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
module.exports = {
	findSync:findSync
}