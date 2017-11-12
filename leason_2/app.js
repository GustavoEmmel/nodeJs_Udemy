var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/tecno', function(req, res){
	res.render("session/tecno");
});


app.get('/', function(req, res){
	res.send("<html><body>ola mundo</body></html>");
});


app.listen(3000, function(){
	console.log('servidor com express');
});
