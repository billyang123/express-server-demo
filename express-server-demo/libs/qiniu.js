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
var bucketManager = new qiniu.rs.BucketManager(mac, config);


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
function deleteFile(keyArr,callback){
  var deleteOperations = keyArr.map((key)=>{
    return qiniu.rs.deleteOp(bucket, key)
  })
  console.log(keyArr,deleteOperations);
  bucketManager.batch(deleteOperations, function(err, respBody, respInfo) {
    if (err) {
      console.log(err);
      //throw err;
    } else {
      // 200 is success, 298 is part success
      callback && callback(respBody,respInfo)
      // if (parseInt(respInfo.statusCode / 100) == 2) {
      //   respBody.forEach(function(item) {
      //     if (item.code == 200) {
      //       console.log(item.code + "\tsuccess");
      //     } else {
      //       console.log(item.code + "\t" + item.data.error);
      //     }
      //   });
      // } else {
      //   console.log(respInfo.deleteusCode);
      //   console.log(respBody);
      // }
    }
  });
}
module.exports = {
  upload:myUpload,
  deleteFile:deleteFile
}
