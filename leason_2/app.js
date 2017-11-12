var app = require('./config/server');

var rotaNoticias = require('./app/routes/add_noticia');
rotaNoticias(app);

var rotaHome = require('./app/routes/home')(app);

//seting all routes on one file
var routes = require('./app/routes/routes')(app);

app.listen(3000, function(){
	console.log('server ON');
});
