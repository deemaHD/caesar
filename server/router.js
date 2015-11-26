var express = require('express'),
    router = express.Router(),
    database = require('./db/db'),
    eventsRouter = require('./events/eventsRouter'),
    eventTypesRouter = require('./eventTypes/eventTypesRouter'),
    resourcesRouter = require('./resources/resourcesRouter'),
    resourceTypesRouter = require('./resourceTypes/resourceTypesRouter'),    
    scheduleRouter = require('./schedule/scheduleRouter'),   
    accountsRouter = require('./accounts/accountsRouter'),   
    contributorsRouter = require('./contributors/contributorsRouter'),
    holidaysRouter = require('./holidays/holidaysRouter'),
    citiesRouter = require('./cities/citiesRouter');
    countriesRouter = require('./countries/countriesRouter');

globalMan = {};

router.use(/^\/events\b/, eventsRouter);
router.use(/^\/eventTypes\b/, eventTypesRouter);
router.use(/^\/resources\b/, resourcesRouter);
router.use(/^\/resourceTypes\b/, resourceTypesRouter);
router.use(/^\/schedule\b/, scheduleRouter);
router.use(/^\/accounts/, accountsRouter);
router.use(/^\/contributors\b/, contributorsRouter);
router.use(/^\/holidays\b/, holidaysRouter);
router.use(/^\/cities\b/, citiesRouter);
router.use(/^\/countries\b/, countriesRouter);

router.get('/reset', function(req, res, next) {     
    var resetController = new require('./reset/resetController')(req, res);
});

router.all('/download', function(req, res, next) {     
    var generatorController = new require('./generator/generatorController')(req, res);
});

router.all('/preload', function(req, res, next) {     
    var preloadController = new require('./preload/preloadController')(req, res);
});

router.all('/load', function(req, res, next) {     
    var load = new require('./load/loadController')(req, res);
});

router.all('/dellAll', function(req, res, next) {  
   var load = new require('./dellResAndEvents/dellResAndEventsController')(req, res);
});

router.get('/name', function(req, res, next) {
    var user = globalMan[req.cookies.clientId],
        db = new database();

    db.findUserByLogin(user.login, function (err, account) {
        if (!account) {
            console.log('Invalid login');
        } else {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end(JSON.stringify(account));
        }
    });

});


router.post('/', function (req, res) {
    var staticRoute = /^\/dev/.test(req.url)? '../client': './public';
    var db = new database();
    db.findUser( req.body.login , req.body.password, function (err, account) {
        if (!account) {
            console.log('Invalid login');
            res.render('index.jade', { error: 'Invalid login or password'});
        } else {
                var id = setRandomId(),
                    maxAge = 3600000;
                    
                globalMan[id] = account;
                res.cookie('clientId', id, { maxAge: maxAge });
                res.sendFile('home.html', { root: staticRoute });       
        }   
    });
});


router.get('/', function (req, res) {
    console.log('hello from get/');
    var staticRoute = /^\/dev/.test(req.url)? '../client': './public';
	
	if(globalMan[req.cookies.clientId] === undefined) {
		 res.clearCookie('clientId');
		 res.render('index.jade');
	} else {
        if(req.cookies && req.cookies.clientId) {
            res.sendFile('home.html', { root: staticRoute });
        } else {
            res.render('index.jade');
        }
    }
});

router.get('/logout', function (req, res) {
    console.log('hello from logout');
    if (req.cookies && req.cookies.clientId) {
        res.clearCookie('clientId', { path: '/' });
		delete globalMan[req.cookies.clientId];
    }
    res.redirect('/');
});


router.get('*', function (req, res) {
    var staticRoute = /^\/dev/.test(req.url)? '../client': './public';
    
	if (globalMan[req.cookies.clientId] === undefined) {
		res.clearCookie('clientId', { path: '/' });
		res.redirect('/');
	} else {
        if (req.cookies && req.cookies.clientId) {
            if (!isRest(req.url)) { 
                console.log('hello from send File - home.html'); 
                res.sendFile('home.html', { root: staticRoute });
            }
        } else {
            res.redirect('/');
        }   
    }
});

function setRandomId () {
    var lettersNumbers = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
        length = 16,
        clientId = '',
        i;
    for ( i = 0; i < length; i++ ) {
       clientId += lettersNumbers.charAt(Math.floor(Math.random() * length));
    }
    return clientId;
}

function isRest (url) {
    var restList = [
        'events',
        'eventTypes',
        'schedule',
        'resources',
        'resourceTypes',
        'accounts', 
        'contributors', 
        'holidays',
        'cities',
        'countries'
        ],
        rest = false;
    
    restList.forEach(function (restName) {
        var regExp = new RegExp(restName + '\\b');

        if (regExp.test(url)) {
            rest = true;
        }
    });

    return rest;
}

module.exports = router;

