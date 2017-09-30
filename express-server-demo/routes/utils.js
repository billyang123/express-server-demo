var express = require('express');
var router = express.Router();
var fs = require('fs');
var multiparty = require('multiparty');
var qiniu = require('../libs/qiniu');


//var uploader = require('multer')({ dest: D+C.upload.path });

router.get('/upload', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/upload',function (req, res, next) {
  console.log(req.file);
  var uploadDir = D+C.upload.path;
  var form = new multiparty.Form({uploadDir: uploadDir});
  form.parse(req, function(err, fields, files) {
      if(err){
        console.log('parse error: ' + err);
      } else {
        var inputFile = files.file[0];
        var uploadedPath = inputFile.path;
        var ups = uploadedPath.split('/');
        var realName = ups[ups.length-1];
        qiniu.upload(uploadedPath,function(ret,info){
          fs.unlinkSync(uploadedPath)
          res.json({
            status:{
              code:0
            },
            originalFilename:inputFile.originalFilename,
            localFileName:realName,
            key:ret.key,
            size:inputFile.size,
            path:`http://${C.upload.qnStaticDomain}/${ret.key}`
          })
        })
      }
  })
});

router.get('/delQiniuFile', function(req, res, next) {
  var keysArr = req.query.keys.split(',');
  console.log(keysArr);
  qiniu.deleteFile(keysArr,function(d,r){
    console.log(d,r);
    res.json({
      status:{
        code:0,
        msg:"删除成功"
      }
    })
  })
});
module.exports = router;
