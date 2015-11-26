var express = require('express'),
	resourcesRouter = express.Router();
 
resourcesRouter.all('/:id', function(req, res, next) {		
    var resourcesController = new require('./resourcesController')(req, res);
});

resourcesRouter.all('/', function(req, res, next) {		
    var resourcesController = new require('./resourcesController')(req, res);
});

module.exports = resourcesRouter;
