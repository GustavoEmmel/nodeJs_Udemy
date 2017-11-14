var mysql = require('mysql');

var connMySQL = function(){
	console.log('conexao com db com sucesso');
	return mysql.createConnection({
		host : 'localhost', 
		user : 'root', 
		password : 'mysql',
		database : 'portal_noticias'
	});	
}

module.exports = function () {
	console.log('autoload carregou o modulo de db connection');
	return connMySQL;
}
