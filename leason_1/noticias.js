var http = require('http');

var server = http.createServer(function(req, res){

	var category = req.url;

console.log(category);

	if(category == '/tecno'){
		res.end('<html><body>Tecnologia</body></html>');
	} else {
		res.end('<html><body>ola mundo</body></html>');	
	}
	

});

server.listen(3000);