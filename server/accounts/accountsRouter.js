var express = require('express'),
	accountsRouter = express.Router({mergeParams: true});

accountsRouter.all('/:id', function(req, res, next) {	
    var accountsController = new require('./accountsController')(req, res);
});

accountsRouter.all('/', function(req, res, next) {		
    var accountsController = new require('./accountsController')(req, res);
});


module.exports = accountsRouter;
