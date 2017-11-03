var mysql = require('mysql');
var env = 'prod';

/*var connection = mysql.createPool({
		database : 'desibites_dev',
	    user : 'ftdev',
		password : '10gXWOqeaf',
	    host :'apps.fountaintechies.com',
	 });*/

var connection = mysql.createPool({
		database : 'cupcake',
	    user : 'root',
		password : '10gXWOqeaf',
	    host :'db.80startups.com',
	 });
module.exports = connection;
