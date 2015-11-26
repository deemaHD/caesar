var express = require('express'),
	eventsRouter = express.Router({mergeParams: true});

eventsRouter.all('/:id', function(req, res, next) {	
    var eventsController = new require('./eventsController')(req, res);
});

eventsRouter.all('/', function(req, res, next) {	
    var eventsController = new require('./eventsController')(req, res);
});

module.exports = eventsRouter;
