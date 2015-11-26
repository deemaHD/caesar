function ScheduleView () {
	
	this.returnSchedule = function (week) {
		return JSON.stringify(week);
	}

	return this;
}

module.exports = ScheduleView;