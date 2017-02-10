'use strict';
// Includes
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var fs = require('fs');

// Cardsets
var cardsets = {
	'apparenteffect': __dirname + '/cardsets/1.json.b64'};

// Setup Express application
app.use('/css/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

// Routes
app.get('/api/cardsets/:name', function(req, res) {
	if(!(req.params.name in cardsets))
		res.sendCode(404);
	fs.readFile(cardsets[req.params.name], 'utf8', function(err, data) {
		if(err)
			res.sendCode(404);

		if(typeof Buffer.from === 'function') {
			// Node 5.10+
			res.json(Buffer.from(data, 'base64').toString('utf8'));
		} else {
			// Ye olde Node
			res.json(new Buffer(data, 'base64').toString('utf8'));
		}
	});
});

// CSS
app.get('/cover.css', function(req, res) {
	res.sendfile(__dirname + '/public/cover.css');
});

// Browserify bundle
app.get('/bundle.js', function(req, res) {
	res.sendfile(__dirname + '/public/bundle.js');
});

// Everyone else gets redirected to index
app.get('*', function(req, res) {
	res.sendfile(__dirname + '/public/index.html');
});

// Listen
app.listen(8080);
console.log('App listening on port 8080');

