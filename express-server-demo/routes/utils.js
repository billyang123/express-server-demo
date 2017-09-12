var express = require('express');
var router = express.Router();
var fs = require('fs');
var multiparty = require('multiparty');
var qiniu = require('../libs/qiniu');
//
// qiniu.conf.ACCESS_KEY = 'vGLVjXkIytX-83w38x7rhST9';
// qiniu.conf.SECRET_KEY = 'FZGuMCvwUzrmLIOxmdCD0JgpD5zmkvtB4SADGEYl'
//
// bucket = ''//要上传的空间
// key = ''//上传到qiniu 后保存的文件名
//
// //构建上传策略函数
// function uptoken(bucket,key){
//   var putPolicy = new qiniu.rs.PutPolicy(bucket+':'+key);
//   return putPolicy.token()
// }
// //生成上传 Token
// token = uptoken(bucket,key);
// //要上传文件的本地路径
// filePath = ''
// //构造上传函数
// function uploaFile(uptoken,key,localFile){
//   var extra = new qiniu.io.PutExtra();
//   qiniu.io.putFile(uptoken,localFile,extra,function(err,ret){
//     if(!err){
//       console.log(ret.hash,ret.key,ret.persistentId);
//     }else{
//       console.log(err);
//     }
//   })
// }

router.get('/upload', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/upload',function (req, res, next) {
  var uploadDir = D+'/public/images/';
  var form = new multiparty.Form({uploadDir: uploadDir});
  form.parse(req, function(err, fields, files) {
      if(err){
        console.log('parse error: ' + err);
      } else {
        console.log('parse files: ' + JSON.stringify(files,null,2));
        var inputFile = files.file[0];
        var uploadedPath = inputFile.path;
        var ups = uploadedPath.split('/');

        var realName = ups[ups.length-1];

        qiniu.upload(inputFile.originalFilename,uploadedPath,function(err,ret){
          res.json({
            status:{
              code:0
            },
            localPath:`/images/${realName}`,
            path:`http://${C.qnStaticDomain}/${ret.key}`
          })
        })
        //重命名为真实文件名
        // var dstPath = uploadDir +  realName;
        // fs.rename(uploadedPath, dstPath, function(err) {
        //   if(err){
        //     console.log('rename error: ' + err);
        //   } else {
        //     res.json({
        //       status:{
        //         code:0
        //       },
        //       url:`/images/${realName}`
        //     })
        //   }
        // });
      }
  })
});
module.exports = router;
