// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express    = require('express');		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser'); 	// get body-parser
//var mongoose   = require('mongoose');
//var MongoClient = require('mongodb').MongoClient
//var format = require('util').format;
var config 	   = require('./config');
var path 	   = require('path');

//var User       = require('./app/models/user');
var jwt        = require('jsonwebtoken');

//get the db
var userDb = require('./userDb');

// super secret for creating tokens
var superSecret = config.secret;

// APP CONFIGURATION ==================
// ====================================
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// connect to our database (hosted on modulus.io)
//mongoose.connect(config.database); 

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/public'));

// ROUTES FOR OUR API =================
// ====================================

// API ROUTES ------------------------
var apiRouter = express.Router();

	// test route to make sure everything is working 
	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res) {
		//res.json({ message: 'hooray! welcome to our api!' });	
	});

	// on routes that end in /users
	// ----------------------------------------------------
	apiRouter.route('/users')

		// create a user (accessed at POST http://localhost:8080/users)
		// .post(function(req, res) {
			
		// 	var user = new User();		// create a new instance of the User model
		// 	user.name = req.body.name;  // set the users name (comes from the request)
		// 	user.username = req.body.username;  // set the users username (comes from the request)
		// 	user.password = req.body.password;  // set the users password (comes from the request)

		// 	user.save(function(err) {
		// 		if (err) {
		// 			// duplicate entry
		// 			if (err.code == 11000) 
		// 				return res.json({ success: false, message: 'A user with that username already exists. '});
		// 			else 
		// 				return res.send(err);
		// 		}

		// 		// return a message
		// 		res.json({ message: 'User created!' });
		// 	});
        .post(userDb.addUser)
 
			// MongoClient.connect(config.database, function(err, db) {
   //              if(err) throw err;
   //              //insert the collection users
   //              db.collection('users').insert({name: req.body.name, username: req.body.username }, {w:1}, function(err, objects) {
   //                 if (err) { console.warn(err.message); return res.send(err);}
   //                 if (err && err.message.indexOf('E11000 ') !== -1) {
   //                  // this _id was already inserted in the database 
   //                  return res.json({ success: false, message: 'A user with that username already exists. '});
   //                 }

   //                 // return a message
			// 	   res.json({ message: 'User created!' });
   //              });
   //         });

   

		// get all the users (accessed at GET http://localhost:8080/api/users)
		.get(userDb.findAll);

	// on routes that end in /users/:user_id
	// ----------------------------------------------------
	apiRouter.route('/users/:user_id')

		// get the user with that id
		// .get(function(req, res) {
		// 	User.findById(req.params.user_id, function(err, user) {
		// 		if (err) res.send(err);

		// 		// return that user
		// 		res.json(user);
		// 	});
		// })
        .get(userDb.findById)
		// update the user with this id
		// .put(function(req, res) {
		// 	User.findById(req.params.user_id, function(err, user) {

		// 		if (err) res.send(err);

		// 		// set the new user information if it exists in the request
		// 		if (req.body.name) user.name = req.body.name;
		// 		if (req.body.username) user.username = req.body.username;
		// 		if (req.body.password) user.password = req.body.password;

		// 		// save the user
		// 		user.save(function(err) {
		// 			if (err) res.send(err);

		// 			// return a message
		// 			res.json({ message: 'User updated!' });
		// 		});

		// 	});
		// })
        .put(userDb.updateUser)
		// delete the user with this id
		// .delete(function(req, res) {
		// 	User.remove({
		// 		_id: req.params.user_id
		// 	}, function(err, user) {
		// 		if (err) res.send(err);

		// 		res.json({ message: 'Successfully deleted' });
		// 	});
		// });

       .delete(userDb.deleteUser);
	// api endpoint to get user information
	apiRouter.get('/me', function(req, res) {
		res.send(req.decoded);
	});

app.use('/api', apiRouter);

// MAIN CATCHALL ROUTE --------------- 
// SEND USERS TO FRONTEND ------------
// has to be registered after API ROUTES
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// START THE SERVER
// ====================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);
