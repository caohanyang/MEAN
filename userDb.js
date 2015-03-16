var MongoClient = require('mongodb').MongoClient;
var BSON = require('mongodb').BSONPure;
var assert = require('assert');
var config  = require('./config');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;
var db;

// connect to Server
MongoClient.connect(config.database,function(err, database){
	if (!err)
		console.log('Connected to Server successfully');
	db = database;
});

// get all 
exports.findAll = function(req, res){
	db.collection('users',function(err, collection){
		if (err) {
			res.send(err);
		} else {
			collection.find().toArray(function(err, items){
				if (err) {
					res.send(err);
				} else {
					res.send(items);
				}
			});
		}
		
	});
}

// get one by id
exports.findById = function(req, res){
	
	var id = req.params.user_id;
	console.log('Retrieving user ' + id);
	db.collection('users', function(err, collection){
		if (err) {
			res.send(err);
		} else {
			collection.findOne({'_id': BSON.ObjectID(id)}, function(err, item){
			//collection.findOne({'_id': id}, function(err, item){
				if (err) {
					res.send(err);
				} else {
					res.send(item);
				}
			});
		}
	});
}

// add
exports.addUser = function(req, res){
	var user = req.body;
	console.log('Adding user:' + JSON.stringify(user));
	db.collection('users', function(err, collection){
		if (err) {
			res.send(err);
		} else {
			collection.insert(user, { safe:true}, function(err, result){
				if (err) {
					res.send(err);
				} else {
					console.log('Success:'+ JSON.stringify(result));
					res.send(result);
				}
			});
		}
		
	});
}

// update
exports.updateUser = function(req, res){
	var id = req.params.user_id;
	var user = req.body;
	user._id = BSON.ObjectID(id);
	console.log('Updating user:'+ id);

	db.collection('users', function(err, collection){
		assert.equal(err, null); 
		collection.save(user, function(err, result){
		//collection.update({ '_id': id }, user, { safe:true }, function(err, result){
			assert.equal(err, null);
			console.log( result + ' document(s) updated.');
			console.log(user);
			res.send(user);
		});
	    
	 });
}

// delete
exports.deleteUser = function(req, res){
	var id = req.params.user_id;
	console.log('Deleting user:' +id);
	db.collection('users', function(err, collection){
		assert.equal(err, null);
		collection.remove({ '_id': BSON.ObjectID(id)}, { safe:true}, function(err, result){
			assert.equal(err, null);
			console.log( result + ' document(s) deleted');
		});
	});
}

