(function (This) {
	This.timelines = {
		'1': '8:00',
		'2': '8:30',
		'3': '9:00',
		'4': '9:30',
		'5': '10:00',
		'6': '10:30',
		'7': '11:00',
		'8': '11:30',
		'9': '12:00',
		'10': '12:30',
		'11': '13:00',
		'12': '13:30',
		'13': '14:00',
		'14': '14:30',
		'15': '15:00',
		'16': '16:00',
		'17': '16:30',
		'18': '17:00',
		'19': '17:30',
		'20': '18:00',
		'21': '18:30',
		'22': '19:00'
	};

	This.daysName = {
		'1': 'Monday',
		'2': 'Tuesday',
		'3': 'Wednesday',
		'4': 'Thursday',
		'5': 'Friday'
	};

	This.createWeekItem = function (options) {
			var dayTimeline = {},
				day = {},
				week = new This.Week();

			if (options.dayNumber) {
				if (options.timeline) {

					if (options.eventId !== undefined) {
						dayTimeline[options.timeline] = [options.eventId];
						dayTimeline[options.timeline] = _.flatten(dayTimeline[options.timeline]);		
					} else {
						dayTimeline[options.timeline] = [];
					};
				
				} else {
					dayTimeline = {};
				};

				day[options.dayNumber] = dayTimeline;	
			} else {
				day = {};
			};
		
 			week.set({
				'startDate': options.startDate,
				'days': day
			});

			return week;
	};

	This.getFisrtDayOfWeek = function (date) {
		var tempDate = new Date(date);
		//find Monday's date with any date of week
		tempDate = tempDate.adjustDate(-(tempDate.getDay() -1));
		return tempDate;
	};

	This.isConflicts = function (eventsId) {
		var conflicts = [],
			isConflict = false,
			resources,
			event;

			_.each(eventsId, function (id) {
				event = collections.eventsCollection.findWhere({'id': id});
				if (event) {
					resources = event.get('resources');

					conflicts = _.intersection(resources, conflicts);
					if (!_.isEmpty(conflicts)) {
						isConflict = true;
					};
					conflicts.push(resources);
					conflicts = _.flatten(conflicts);
				};

			}, this);

		return isConflict;
	};

	This.DateNormalize = function (dayNumber) {
		var normal = String(dayNumber);

		if (dayNumber < 10) {
			normal = '0' + dayNumber;
		};

		return normal
	};

	This.getWeekItemByDate = function (date) {
		var dateToString,
			weekDate,
			weekItem;

		if (typeof(date) === 'object') {
			dateToString = date.toDateString();
		};

		if (collections.scheduleCollection) {
			collections.scheduleCollection.each(function (week) {
			
				weekDate = week.get('startDate').toDateString();
				if (dateToString === weekDate) {
					weekItem = week;
			};
		}, this);
		};

		return weekItem;
	};

	This.isBelongToWeek = function (_startWeekDate, _dateToCheck) {
		var startWeekDate = (typeof(_startWeekDate) === 'object') ? _startWeekDate: (new Date(_startWeekDate)),
			finishWeekDate = new Date(startWeekDate),
			dateToCheck = (typeof(_dateToCheck) === 'object') ? _dateToCheck: (new Date(_dateToCheck)),
			isBelong = false;

		finishWeekDate.setDate(startWeekDate.getDate() + 7);

		dateToCheck.setHours(0, 0, 0, 0);
		startWeekDate.setHours(0, 0, 0, 0);
		finishWeekDate.setHours(0, 0, 0, 0);

		if (dateToCheck >= startWeekDate && dateToCheck < finishWeekDate) {
			isBelong = true;
		};

		return isBelong;
	};
})(App.Schedule);