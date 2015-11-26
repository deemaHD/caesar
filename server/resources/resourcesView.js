function ResourcesView () {
	this.returnResources = function (resources, req) {
		var arrEvants = [];

		function checkCity (city) {
			if(globalMan[req.cookies.clientId].role === "Admin") {
                arrEvants = resources;
			} else if (city.locationCity === globalMan[req.cookies.clientId].locationCity){
				arrEvants.push(city);
			}	
		}
		
		if(req.method === "GET") {
		    resources.forEach(function(item) {	
				checkCity(item)
		    });
			resources = arrEvants;
		}
		return JSON.stringify(resources);
	}

	return this;
}

module.exports = ResourcesView;