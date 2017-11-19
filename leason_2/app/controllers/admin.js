module.exports.form_add = function(app, req, res){
	res.render("admin/form_add_noticia", {validacao : {}, noticia : {}} );
}

module.exports.noticias_salvar = function(app, req, res){
	var noticia = req.body;

	req.assert('titulo','Titulo é obrigatorio').notEmpty();
	req.assert('resumo','Resumo é obrigatorio').notEmpty();
	req.assert('resumo','Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
	req.assert('autor','autor é obrigatorio').notEmpty();
	req.assert('data_noticia','data é obrigatorio').notEmpty();
	req.assert('noticia','noticia é obrigatorio').notEmpty();

	var erros = req.validationErrors();

	console.log(erros);

	if (erros) {
		res.render("admin/form_add_noticia", {validacao : erros, noticia: noticia});	
		return;
	}

	var connection = app.config.dbConnection();
	var noticiasModel = new app.app.models.NoticiasDAO(connection);

	noticiasModel.salvarNoticia(noticia, function(error, result){
		res.redirect("/noticias");
	});
}