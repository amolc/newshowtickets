var mysql = require('mysql');
var env = 'prod';

var connection = mysql.createPool({
		database : 'cupcakes',
	    user : 'ftdev',
		password : '10gXWOqeaf',
	    host :'apps.fountaintechies.com',
	 });
module.exports = connection;
