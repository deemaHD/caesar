var express = require('express'),
	citiesRouter = express.Router({mergeParams: true});

citiesRouter.all('/:id', function(req, res, next) {	
    var citiesController = new require('./citiesController')(req, res);
});

citiesRouter.all('/', function(req, res, next) {		
    var citiesController = new require('./citiesController')(req, res);
});


module.exports = citiesRouter;
