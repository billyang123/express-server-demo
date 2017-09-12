var qiniu = require("qiniu");
var qnStaticDomain = "7xv0yi.com2.z0.glb.clouddn.com";
var bucket = 'ybbtest';
//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'vGLVjXkIytX-83w38x7rhST9uITxdYVkbodF_TFe';
qiniu.conf.SECRET_KEY = 'FZGuMCvwUzrmLIOxmdCD0JgpD5zmkvtB4SADGEYl';


//构建上传策略函数
function uptoken(bucket, key) {
  console.log(bucket+":"+key)
  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);

  //putPolicy.callbackUrl = 'http://your.domain.com/callback';
  //putPolicy.callbackBody = 'filename=$(fname)&filesize=$(fsize)';

  return putPolicy.token();
}
//构造上传函数
function uploadFile(uptoken, key, localFile,callback) {
  var extra = new qiniu.io.PutExtra();
  console.log(uptoken, key, localFile);
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId);
      } else {
        // 上传失败， 处理返回代码
        console.log(err);
      }
      callback && callback(err, ret)
  });
}

//调用uploadFile上传
//uploadFile(token, key, filePath);


function myUpload(key, filePath,callback){
	//生成上传 Token
	var token = uptoken(bucket, key);
	console.log(token)
	uploadFile(token, key, filePath,callback);
}
module.exports = {
  upload:myUpload
}
