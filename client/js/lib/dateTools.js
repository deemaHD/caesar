function formatDate (dateValue) {
	var dd = ('0' + dateValue.getDate()).substr(-2),
		mm = ('0' + (dateValue.getMonth() + 1)).substr(-2),
		yy = String(dateValue.getFullYear()).substr(-2);

	return dd + '.' + mm + '.' + yy;
}


function getTimeAsIntervals(_time1, _time2) {
	var time1 = _time1.split(':'),
		time2 = _time2.split(':'),
		dayStart = new Date(2000, 0, 1, 8, 00),
		date1 = new Date(2000, 0, 1, time1[0], time1[1]),
		date2 = new Date(2000, 0, 1, time2[0], time2[1]),
		msPerHalfHour = 1000 * 60 * 30,
		firstIntervalNumber = (date1 - dayStart) / msPerHalfHour,
		intervalsCount = (date2 - date1) / msPerHalfHour,
		intervalsArray = [],
		i;

	for (i = 0; i < intervalsCount; i++) {
		intervalsArray.push(firstIntervalNumber + i);
	}

	return intervalsArray;
}


function getWeekDays (weekNumber) {
	var msInDay = 1000 * 60 * 60 * 24;
	var	msInWeek = msInDay * 7;
	var firstWeekStart = getFirstDayOfFirstWeek();
	var	weekStart = Number(firstWeekStart) + msInWeek * (weekNumber - 1);
	var days = [];
	var i;

	for (i = 0; i < 7; i++) {
		days.push(new Date(weekStart + msInDay * i));
	}

	return days;
}

function getDateByWeekAndDay (weekNumber, _dayNumber) {
	var dayNumber = (_dayNumber === 0)? 7: _dayNumber;
	var msInDay = 1000 * 60 * 60 * 24;
	var	msInWeek = msInDay * 7;
	var firstWeekStart = getFirstDayOfFirstWeek();
	var	weekStart = Number(firstWeekStart) + msInWeek * (weekNumber - 1);
	var dayDate = weekStart + msInDay * (dayNumber - 1);

	return new Date(dayDate);
}

function getFirstDayOfFirstWeek () {
	var msInDay = 1000 * 60 * 60 * 24;
	var thisYear = (new Date()).getFullYear();
	var	firstDay = new Date(thisYear, 0, 1, 0, 0, 0, 0001);
	var firstDayNumber = firstDay.getDay();
	var firstWeekStart = Number(firstDay) - msInDay * (firstDayNumber - 1);

	return new Date(firstWeekStart);
}

Date.prototype.getWeek = getWeek;

function getWeek () {
	var date = this;
	var msInWeek = 1000 * 60 * 60 * 24 * 7;
	var firstWeekStart = getFirstDayOfFirstWeek();
	var datesDiff = Number(date) - Number(firstWeekStart);
	var weekNum = Math.floor(datesDiff/msInWeek);

	return weekNum;
}
