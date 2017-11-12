var app = require('./config/server');

app.get('/', function(req, res){
	res.render("home/index");
});

app.get('/form_add', function(req, res){
	res.render("admin/form_add_noticia");
});

app.get('/noticias', function(req, res){
	res.render("noticias/noticias");
});

app.get('/tecno', function(req, res){
	res.render("session/tecno");
});

app.listen(3000, function(){
	//executing msg function
	console.log('teste');
});
