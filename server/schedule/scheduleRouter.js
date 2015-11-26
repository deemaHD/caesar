var express = require('express'),
	scheduleRouter = express.Router({mergeParams: true});

scheduleRouter.all('/:id', function(req, res, next) {	
    var scheduleController = new require('./scheduleController')(req, res);
});

scheduleRouter.all('/', function(req, res, next) {		
    var scheduleController = new require('./scheduleController')(req, res);
});


module.exports = scheduleRouter;
