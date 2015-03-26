var MongoClient = require('mongodb').MongoClient;
var BSON = require('mongodb').BSONPure;
var assert = require('assert');
var config  = require('./config');
var bodyParser = require('body-parser');
var ObjectID = require('mongodb').ObjectID;
//use the JSONDIFFPATCH
var jsondiffpatch = require('jsondiffpatch').create();

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
			return res.send(err);
		} 
		collection.find().toArray(function(err, users){
			if (err) {
				return res.send(err);
			}
			res.send(users);
		});
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
			collection.findOne({'_id': BSON.ObjectID(id)}, function(err, user){
				if (err){
					return res.send(err);
				}
				res.send(user);
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
					console.log('Success:'+ JSON.stringify(result[0]));
					res.send(result[0]);
				}
			});
		}
		
	});
}

// update
exports.updateUser = function(req, res){
	//get the id
	var id = req.params.user_id;
    // get the delta
	var delta = req.body;
  
    //prepare to update the data
	db.collection('users', function(err, collection){
		assert.equal(err, null); 
        
        //find the old value
        collection.findOne({'_id': BSON.ObjectID(id)}, function(err, user){
        	 assert.equal(err, null);

		     // patch original
             jsondiffpatch.patch(user, delta);
          
             //change the type of id
             user._id = BSON.ObjectID(id);

             //save
             collection.save(user, function(err, result){
			   assert.equal(err, null);
			   res.end();
			   console.log( result + ' document(s) updated.');
		  });
	    
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
			res.end();
			console.log( result + ' document(s) deleted');
		});
	});
}

