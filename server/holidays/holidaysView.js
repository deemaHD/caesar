function HolidaysView () {
	this.returnHolidays = function (holidays, req) {
		return JSON.stringify(holidays);
	}

	return this;
}

module.exports = HolidaysView;