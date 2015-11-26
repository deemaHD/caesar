var express = require('express'),
	countriesRouter = express.Router({mergeParams: true});

countriesRouter.all('/:id', function(req, res, next) {	
    var countriesController = new require('./countriesController')(req, res);
});

countriesRouter.all('/', function(req, res, next) {		
    var countriesController = new require('./countriesController')(req, res);
});


module.exports = countriesRouter;
