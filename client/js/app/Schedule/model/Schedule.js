(function (This) {
	This.Schedule = Backbone.Collection.extend({
		model: This.Week,
		url: '/schedule',

		initialize: function () {
			collections.eventsCollection.on('remove', this.cascadeDeleteEvents);
		},

		cascadeDeleteEvents: function (event) {
			var eventId = event.get('id'),
				weekItem,
				days;

			if (!_.isEmpty(collections.scheduleCollection)) {
				collections.scheduleCollection.each(function (week) {
					if (week) {
						days = week.get('days');
						if (!_.isEmpty(days)) {
							_.each(days, function (timelines, dayNumber) {
								_.each(timelines, function (eventsId, timeline) {
									_.each(eventsId, function (id) {
										if (id === eventId) {
											weekItem = This.createWeekItem({
												'startDate': week.get('startDate'),
												'dayNumber': dayNumber,
												'timeline': timeline,
												'eventId': id
											});
											collections.scheduleCollection.deleteEvent(weekItem);
										};
									});
								}, this);
							}, this);
						};
					};
				});
			};

			cs.mediator.publish('EventDeletedFromCollection');
		},

		addEvent: function (week) {

			var rightWeek = This.getWeekItemByDate(week.get('startDate')),
				startDate = This.getFisrtDayOfWeek(week.get('startDate')),
				attributes = {},
				days;

			if (!rightWeek) {
				this.push(week);
				rightWeek = This.getWeekItemByDate(week.get('startDate'));
				
			} else {
				days = rightWeek.get('days');

				_.each(week.get('days'), function (day, dayNumber) {
					days[dayNumber] || (days[dayNumber] = {});
				
					_.each(day, function (eventsId, timeline) {
						days[dayNumber][timeline] || (days[dayNumber][timeline] = []);
						
							_.each(eventsId, function (eventId) {
								days[dayNumber][timeline].push(eventId);
								days[dayNumber][timeline] = _.flatten(days[dayNumber][timeline]);
								days[dayNumber][timeline] = _.uniq(days[dayNumber][timeline]);						
							}, this);
					}, this);
				}, this);
			};
			rightWeek.save();
		
		},

		deleteEvent: function (week) {
			var rightWeek = This.getWeekItemByDate(week.get('startDate')),
				days = week.get('days'),
				rightDay = rightWeek.get('days')[Object.keys(days)],
				currentEvents;

				_.each(days, function (day, dayNumber) {

					_.each(day, function (eventId, timeline) {

						currentEvents = rightDay[timeline];
						currentEvents.splice(currentEvents.indexOf( Number(eventId)), 1);

						if (_.isEmpty(currentEvents)) {
							delete rightDay[timeline]
						};
						if (_.isEmpty(rightDay)) {
							delete rightWeek.get('days')[dayNumber]
						};
						if (_.isEmpty(rightWeek.get('days'))) {
							this.remove(this.models[this.models.indexOf(rightWeek)]);
						};
					}, this)
				}, this);

			if (_.isEmpty(rightWeek.get('days'))) {
				rightWeek.destroy();
			} else {
				rightWeek.save();
			};
		}
	})
})(App.Schedule);