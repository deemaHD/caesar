function PreloadController (req, res) {
    var db = new require('../db/db')(),
        queue = require("queue-async"),
        _ = require('underscore-node'),
        collections = {
            'resouresCollection': [],
            'eventsCollection': [],
            'scheduleCollection': [],
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
            .defer(db.fetch, 'resources')
            .defer(db.fetch, 'events')
            .defer(db.fetch, 'weeks')
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
	
	function checkRole () {
		var byCity = [ 'resouresCollection',
				       'eventsCollection'
		    ],
			byCountry = [ 'holidaysCollection'];

			function selsectByLocation (arr, location, manlocation) {
				_.each(arr, function (item) {
					var contributorCollection = [];
					 _.each(collections[item], function (data) {
						 if(data[location] == manlocation) {
							contributorCollection.push(data);
						 } 
					})
					collections[item] = contributorCollection;
			    })
			}
			
			function findCountry (city) {
				var country;

				_.each(collections.citiesCollection, function (item) {
					if(item.id === city) {
						country = item.location;
					}
				})
				
				return country;
			} 
			
			
			var locNumber = globalMan[req.cookies.clientId]['locationCity'];
			selsectByLocation(byCity, 'locationCity', locNumber);
			
			if(globalMan[req.cookies.clientId].role !== "Admin") {
				var county = findCountry(locNumber);
			    selsectByLocation(byCountry, 'locationCountry', county);
				collections.accountsCollection = [];
			}
	}
    
    function sendResponse () {
		checkRole();
        res.send(collections);    
    }   
    
    return this;
}

module.exports = PreloadController;