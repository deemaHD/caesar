(function (This) {
	This.ScheduleView = This.CalendarView.extend({
		direction: 0,

		events: {
			'click td[class=calendarCell]': 'renderSelectedEvent'
		},

		setDirection: function (_direction) {
			this.direction = _direction;
		},

		setupSelectedEvent: function (event) {
			this.selectedEvent = event;
		},

		getElement: function () {
			return this.$el;
		},

		isAvaliableEvent: function (event) {

			return (event && event.get('locationCity') === User.get().locationCity);
		},

		renderEvents: function () {
			this.chooseWeek();
			this.checkHolidays();
			this.checkConglictsInCells();
			this.checkWeekends();
		},

		chooseWeek: function () {
			var rightWeek = This.getWeekItemByDate(this.startDate);

			if (rightWeek) {
				_.each(rightWeek.get('days'), this.showDay, this)
			};
		},

		showDay: function (day, dayNumber) {	
			var $elements,
				event;	
			_.each(day, function (timelines, key) {
				$elements = this.$el.find('tr[timeline="' + key + '"]');
				$elements = $elements.find('td[day="' + dayNumber + '"]');
					_.each(timelines, function (eventId) {
						event = collections.eventsCollection.get(Number(eventId));

						if (this.isAvaliableEvent(event)) {
							$elements.append(this.createCell(event, dayNumber, key, this.$el))
						};
					}, this);
			}, this);
		},

		createCell: function (event, dayNumber, timeline, $table) {
			var scheduleCellView = new This.ScheduleCellView({model: event});

			scheduleCellView.setDayNumber(dayNumber);
			scheduleCellView.setTimeline(timeline);
			scheduleCellView.setTable($table);

			return scheduleCellView.render().el;
		},

		checkHolidays: function () {
			var holidayView,
				date,
				$cells;
			this.$el.find('.holidayCell').remove();

			collections.holidaysCollection.each(function (holiday) {
				if (holiday.skippedByLocation()) {
					date = new Date(holiday.get('date'));
				
					//if (date.getWeekNumber() === this.currentWeekNumber) {
					if (This.isBelongToWeek(this.startDate, date)) {

						$cells = this.$el.find('td[day="' + date.getDay() + '"]');
						$cells.each(function (i, el) {			

							holidayView = new This.HolidayView({model: holiday});
							$(el).append(holidayView.render().el);
						});
					};
				};
			}, this);
		},

		checkWeekends: function () {
			this.$el.find('td[day="6"]').addClass('weekend');
			this.$el.find('td[day="0"]').addClass('weekend');
		},

		renderSelectedEvent: function (event) {
			var $target = $(event.currentTarget),
				accept = $target.find('.holidayCell'),
				dayNumber,
				timeline;

			if (this.selectedEvent && !accept.length) {
					dayNumber = $target.attr('day'),
					timeline = $target.parent().attr('timeline');
				$target.append(this.createCell(this.selectedEvent, dayNumber, timeline, this.$el));

				this.addEventToCollection(dayNumber, timeline, this.selectedEvent.get('id'));

				this.checkAvailableCells();
			}
		},

		addEventToCollection: function (dayNumber, timeline, eventId) {
			var weekItem = This.createWeekItem({'dayNumber': dayNumber, 
												'timeline': timeline, 
												'eventId': eventId, 
												'startDate': This.getFisrtDayOfWeek(this.startDate)});
			collections.scheduleCollection.addEvent(weekItem);
		},

		checkAvailableCells: function (_event) {
			var weekItem = This.getWeekItemByDate(this.startDate),
				selectedEvent = (_event)? _event: this.selectedEvent,
				resources,
				conflicts,
				event,
				$cell;
			
			this.$el.find('.danger').removeClass('danger');

			if (selectedEvent && weekItem) {
				resources = selectedEvent.get('resources');

				_.each(weekItem.get('days'), function (timelines, dayNumber) {
					_.each(timelines, function (eventsId, timeline) {
						_.each(eventsId, function (id) {
							event = collections.eventsCollection.get(id);

							if (this.isAvaliableEvent(event)) {
								conflicts = _.intersection(event.get('resources'), resources);

								if (!_.isEmpty(conflicts)) {
									$cell = this.$el.find('tr[timeline="' + timeline + '"]');
									$cell = $cell.find('td[day="' + dayNumber + '"]');

									$cell.addClass('danger');
								};
							}
						}, this);
					}, this);
				}, this);
			};
		},

		isOneChild: function ($cell, eventId) {
			var $children = $cell.children('.calendarCellDiv'),
				cellEvent = Number($children.attr('event'));
				isOne = false;

			if ($children.length === 1 && cellEvent === eventId) {
				isOne = true;
			};

			return isOne;
		},

		checkConglictsInCells: function () {
			var weekItem = This.getWeekItemByDate(this.startDate),
				conflictView,
				$elements;

			this.$el.find('.extendedConflictCell').remove();
			if (weekItem) {
				_.each(weekItem.get('days'), function (timelines, dayNumber) {
					_.each(timelines, function (eventsId, timeline) {

						if (This.isConflicts(eventsId)) {
							conflictView = new This.ExtendedConflictView();

							conflictView.setEvents(eventsId);
							$elements = this.$el.find('tr[timeline="' + timeline + '"]');
							$elements = $elements.find('td[day="' + dayNumber + '"]');

							$elements.append(conflictView.render().el);
						}
					}, this);
				}, this);
			};
		
		}
 	});
})(App.Schedule);