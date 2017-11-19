module.exports = function(app){
	app.get('/form_add', function(req, res){
		app.app.controllers.admin.form_add(app, req, res);
	});	

	app.post('/noticias/salvar', function(req, res){
		app.app.controllers.admin.noticias_salvar(app, req, res);
	});	
}
