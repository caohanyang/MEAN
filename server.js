// BASE SETUP
// ======================================

// CALL THE PACKAGES --------------------
var express    = require('express');		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser'); 	// get body-parser
var path 	   = require('path');

//config
var config 	   = require('./config');
var path 	   = require('path');

//get the db
var userDb = require('./userDb');

// APP CONFIGURATION ==================
// ====================================
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname ));

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
        .post(userDb.addUser)
		// get all the users (accessed at GET http://localhost:8080/api/users)
		.get(userDb.findAll);

	// on routes that end in /users/:user_id
	// ----------------------------------------------------
	apiRouter.route('/users/:user_id')

		// get the user with that id
        .get(userDb.findById)
		// update the user with this id
        .put(userDb.updateUser)
		// delete the user with this id
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
