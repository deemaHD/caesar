function CitiesView () {
	
	this.returnCity = function (city) {
		return JSON.stringify(city);
	}
	return this;
}

module.exports = CitiesView;