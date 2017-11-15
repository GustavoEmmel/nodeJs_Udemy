module.exports = function(app){
	this.getNoticias = function(connection, callback){
		connection.query('select * from noticias', callback);
	}

	this.getNoticia = function(connection, callback){
		connection.query('select * from noticias where id_noticia = 1', callback);
	}

	this.salvarNoticia = function(noticia, connection, callback){
		connection.query('insert into noticias (titulo, noticia) values ("'+noticia.titulo+'", "'+noticia.noticia+'") ', callback);
	}

	return this;
}