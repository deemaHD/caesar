function CountriesView () {	
	this.returnCountry = function (country) {
		return JSON.stringify(country);
	}
	return this;
}

module.exports = CountriesView;