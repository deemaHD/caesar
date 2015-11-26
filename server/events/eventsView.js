exports.EventsView = function () {
	
	this.returnEvents = function (events, req) {
		var arrEvants = [];
		
		function checkCity (city) {
			if(globalMan[req.cookies.clientId].role === "Admin") {
                arrEvants = events;
			} else if (city.locationCity === globalMan[req.cookies.clientId].locationCity) {
				console.log(city.locationCity)
				arrEvants.push(city);
			}   
	    }
		if(req.method === "GET") {
		    events.forEach(function(item) {	
				checkCity(item)
		    });
			events = arrEvants;
		}
        return JSON.stringify(events);
    }
	return this;
}