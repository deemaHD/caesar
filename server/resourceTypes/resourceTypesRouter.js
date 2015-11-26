var express = require('express'),
	resourceTypesRouter = express.Router({mergeParams: true});

resourceTypesRouter.all('/:id', function(req, res, next) {	
    var resourceTypesController = new require('./resourceTypesController')(req, res);
});

resourceTypesRouter.all('/', function(req, res, next) {		
    var resourceTypesController = new require('./resourceTypesController')(req, res);
});


module.exports = resourceTypesRouter;
