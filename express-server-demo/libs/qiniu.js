var qiniu = require("qiniu");
var qnStaticDomain = "7oxjkx.com1.z0.glb.clouddn.com";
var bucket = 'ybbtest';
var accessKey = 'vGLVjXkIytX-83w38x7rhST9uITxdYVkbodF_TFe';
var secretKey = 'FZGuMCvwUzrmLIOxmdCD0JgpD5zmkvtB4SADGEYl';
//需要填写你的 Access Key 和 Secret Key
// qiniu.conf.ACCESS_KEY = accessKey;
// qiniu.conf.SECRET_KEY = accessKey;
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var options = {
  scope: bucket,
}
var putPolicy = new qiniu.rs.PutPolicy(options);
var uploadToken = putPolicy.uploadToken(mac);
var config = new qiniu.conf.Config();

var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();


function myUpload(localFile,callback){
	//生成上传 Token
  console.log(uploadToken)
	formUploader.putFile(uploadToken, null, localFile, putExtra, function(respErr,respBody, respInfo) {
    if (respErr) {
      throw respErr;
    }
    if (respInfo.statusCode == 200) {
      callback(respBody,respInfo)
    } else {
      callback(respBody,respInfo)
    }
  });

}
module.exports = {
  upload:myUpload
}
