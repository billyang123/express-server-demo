var mysql = require('mysql'),
		myConnection = require('express-myconnection'),
		dbOptions = {
      host: 'sqld.duapp.com',
      user: '06d278066a4b4e2c8750537c539cb18f',
      password: '89588763f09f4efb9f341acfd1677e49',
      port: 4050,
      database: 'EldyUktdJcqvCgsGWztf'
    };
module.exports = {
	init:function(app){
		app.use(myConnection(mysql, dbOptions, 'single'))
	},
	query:function(sql,params,req){

		return new Promise(function(resolve, reject) {
			req.getConnection(function(err, conn) {
	      if (err) {
	          return reject(err);
	      } else {
	          conn.query(sql, params, function(err,result) {
	              if (err) {
	                  return reject(err);
	              } else {
	                resolve(result);
	              }
	          });
	      }
	  	});
		})
	}
}