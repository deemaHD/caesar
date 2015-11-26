var express = require('express'),
	eventTypesRouter = express.Router({mergeParams: true});

eventTypesRouter.all('/:id', function(req, res, next) {	
    var eventTypesController = new require('./eventTypesController')(req, res);
});

eventTypesRouter.all('/', function(req, res, next) {		
    var eventTypesController = new require('./eventTypesController')(req, res);
});


module.exports = eventTypesRouter;
