var express = require('express'),
	holidaysRouter = express.Router();
 
holidaysRouter.all('/:id', function(req, res, next) {		
    var holidaysController = new require('./holidaysController')(req, res);
});

holidaysRouter.all('/', function(req, res, next) {		
    var holidaysController = new require('./holidaysController')(req, res);
});

module.exports = holidaysRouter;
