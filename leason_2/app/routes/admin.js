module.exports = function(app){
	app.get('/form_add', function(req, res){
		res.render("admin/form_add_noticia");
	});	

	app.post('/noticias/salvar', function(req, res){
		var noticia = req.body;

		req.assert('titulo','Titulo é obrigatorio').notEmpty();
		req.assert('resumo','Resumo é obrigatorio').notEmpty();
		req.assert('resumo','Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
		req.assert('autor','autor é obrigatorio').notEmpty();
		req.assert('data_noticia','data é obrigatorio').notEmpty();
		req.assert('noticia','noticia é obrigatorio').notEmpty();

		var erros = req.validationErrors();

		if (erros) {
			res.render("admin/form_add_noticia");	
			return;
		}

		var connection = app.config.dbConnection();
		var noticiasModel = new app.app.models.NoticiasDAO(connection);

		noticiasModel.salvarNoticia(noticia, function(error, result){
			res.redirect("/noticias");
		});

	});	
}
