function LoadController (req, res) {
    var db = new require('../db/db')(),
        queue = require("queue-async"),
        _ = require('underscore-node'),
        collections = {
            'eventTypes': [],
            'resourceTypes': [],
            'holidaysCollection': [],
            'accountsCollection': [],
            'citiesCollection': [],
            'countriesCollection': []
        };
    
    handle();
    
    function handle () {
        prepareCollections();
    }
    
    function prepareCollections () {
        queue()
            .defer(db.fetch, 'eventTypes')
            .defer(db.fetch, 'resourceTypes')
            .defer(db.fetch, 'holidays')
            .defer(db.fetch, 'accounts')
            .defer(db.fetch, 'cities')
            .defer(db.fetch, 'countries')
            .awaitAll(function(error, results) { 
                var i = 0;
                _.each(collections, function (element, key) {
                    collections[key] = results[i++];
                });
                sendResponse();
            });
    }
    
    function sendResponse () {
        res.send(collections);    
    }   
    
    return this;
}

module.exports = LoadController;