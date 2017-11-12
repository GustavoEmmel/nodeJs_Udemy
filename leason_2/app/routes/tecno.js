module.exports = function(app){
	app.get('/tecno', function(req, res){
		res.render("session/tecno");
	});
}