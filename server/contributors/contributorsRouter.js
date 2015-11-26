var express = require('express'),
	contributorsRouter = express.Router({mergeParams: true});

contributorsRouter.all('/', function(req, res, next) {		
    var contributorsController = new require('./contributorsController')(req, res);
});

module.exports = contributorsRouter;
