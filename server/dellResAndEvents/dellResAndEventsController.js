function dellResAndEventsController (req, res) {
    var db = new require('../db/db')(),
        queue = require("queue-async"),
        _ = require('underscore-node'),
        collections = {
            'resouresCollection': [],
            'eventsCollection': [],
			'citiesCollection': [],
            'countriesCollection': []
        },
		dellCollections = {
            'resouresCollection': [],
            'eventsCollection': []
        },
		location = []; 

    handle();
    
    function handle () {
        prepareCollections();
    }
    
    function prepareCollections () {
        queue()
            .defer(db.fetch, 'resources')
            .defer(db.fetch, 'events')
            .defer(db.fetch, 'cities')
            .defer(db.fetch, 'countries')
            .awaitAll(function(error, results) { 
                var i = 0;
                _.each(collections, function (element, key) {
                    collections[key] = results[i++];
                });

				if (req.body.city != undefined) {
                    dellByCity();
				} else {
					dellByCountry();
				}
            });
    }
	
	function dellByCity () {
		var resp = JSON.stringify(["o","k"]);
		
		_.each(dellCollections, function (item, key) {
		    _.each(collections[key], function (element) {
				if(element.locationCity == req.body.city) {
					if(key == "resouresCollection") {
						db.remove('resources', element.id, responde);
					} else {
						db.remove('events', element.id, responde);
					}
				}
	        }) 
	   })
	   
	   function responde () {};
	   
       res.send(resp);
		
	}
    
    function dellByCountry () {	
	    var resp = JSON.stringify(["o","k"]);
	
		_.each(collections.citiesCollection, function (el, key) {		
		   if(el.location == req.body.countryID) {
			   location.push(el.id);
		   } 
	   })
	   
	    _.each(dellCollections, function (item, key) {
		    _.each(collections[key], function (element) {
			    _.each(location, function (el) {
				    if(element.locationCity == el) {
						if(key === "resouresCollection") {
							db.remove('resources', element.id, responde);
						} else {
							db.remove('events', element.id, responde);
						}
				    }
			    });
	        }); 
	   })
	   
	   function responde () {};
	   
       res.send(resp);
    }   
    
    return this;
}

module.exports = dellResAndEventsController;