var
  path = require('path'),
  beRoot = path.resolve(__dirname, '..'),
  config = {
    cookieSession: { // session
      name: 'notework',
      keys: ["yangbinbin's notework"]
    },
    db: { // 数据库配置
      uri: 'mongodb://localhost/notework',
      opts: {
        user: '',
        pass: ''
      }
    },
    upload:{
      qnStaticDomain:"7oxjkx.com1.z0.glb.clouddn.com",
      path:'/public/images/'
    },
    host: 'localhost',
    port: 27017,
    dir: { // 目录配置
      root: beRoot,
      model: path.resolve(beRoot, 'models'),
      controller: path.resolve(beRoot, 'controllers'),
      resource: path.resolve(beRoot, '../iview-demo/resource')
    },
    resourceFixUrl: 'http://127.0.0.1:8080/login', // 静态资源web访问修正路径
    exceptFolder: 'except' // model 和 controller 中read dir排除的目录名称
  };

module.exports = config;
