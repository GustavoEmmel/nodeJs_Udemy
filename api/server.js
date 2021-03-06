var express = require('express');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var objectId = require('mongodb').ObjectId;
var multiparty = require('connect-multiparty');
var fs = require('fs');

var app = express();

// this is to get info as x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// this is to receive form with multipart/files
app.use(multiparty());

var port = 8080;
app.listen(port);

var db = new mongodb.Db(
	'instagram', 
	new mongodb.Server('localhost', 27017, {}),
	{}
);

console.log('server on port '+ port);

app.get('/', function(req, res) {
	res.send({msg: 'Olá mundo'});
});


//POST(insert)
app.post('/api', function(req, res){
	
	res.setHeader("Access-Control-Allow-Origin","*");

	var date = new Date();
	var timeStamp = date.getTime();

	var fileName = timeStamp + '_' + req.files.url_image.originalFilename;

	var tempPath = req.files.url_image.path;
	var newPath = './uploads/' + fileName;

	fs.rename(tempPath, newPath, function(err){
		if(err){
			res.status(500).json({error: err});
		} else {

			var data = {
				url_image: fileName,
				title: req.body.title
			}

			db.open( function(err, mongoclient){
				mongoclient.collection('postagens', function(err, collection){
					collection.insert(data, function(err, records){

						if(err){
							res.json({status: 'fail'});
						} else {
							res.json({status: 'success'});
						}
						mongoclient.close();
					});
				});
			});		
		}

	});

});


//GET(select)
app.get('/api', function(req, res){
	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.find().toArray(function(err, results){
				if(err){
					res.json(err);
				} else {
					res.json(results);
				}
				mongoclient.close();
			});
		});
	});
});


//GET by ID(select)
app.get('/api/:id', function(req, res){
	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.find(objectId(req.params.id)).toArray(function(err, results){
				if(err){
					res.json(err);
				} else {
					res.status(200).json({status: 1});
				}
				mongoclient.close();
			});
		});
	});
});


//PUT by ID(update)
app.put('/api/:id', function(req, res){
	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.update(
				{_id: objectId(req.params.id) },
				{ $set: {title: req.body.title}},
				{},
				function(err, records){
					if(err){
					res.json(err);
					} else {
						res.json(records);
					}
					mongoclient.close();
				}
			);
		});
	});
});


//DELETE by ID(delete)
app.delete('/api/:id', function(req, res){
	db.open( function(err, mongoclient){
		mongoclient.collection('postagens', function(err, collection){
			collection.remove( {_id: objectId(req.params.id) }, function(err, records) {

				if(err){
				res.json(err);
				} else {
					res.json(records);
				}
				mongoclient.close();
			} );
		});
	});
});