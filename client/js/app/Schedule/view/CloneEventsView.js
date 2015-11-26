(function (This){
	This.CloneEventsView = Backbone.View.extend({
		template: templates.cloneEventsTpl,
		$table: '',

		events: {
			'click input[type="radio"]': 'setCloneParam',
			'click .weeks': 'chooseWeekClone',
			'click .days': 'chooseDaysClone',
			'click .copySelected': 'collectSelectedEvents',
		},

		initialize: function () {
			this.isAsk = true;
		},

		setCloneParam: function (event) {
			this.cloneParam = $(event.currentTarget).attr('param');
		},

		setAskValue: function (isAsk, action) {
			this.isAsk = isAsk;
			this.action = action;
		},

		collectSelectedEvents: function () {
			this.weekItem = this.generateWeekItem();
		},

 		render: function () {
			this.$el.html(this.template());
			return this;
		},

		setTableEl: function (_table) {
			this.$table = _table;
			this.$table.on('contextmenu', '.chooseDay', this.cloneToSelectedDay.bind(this));
			this.$table.on('click', '.chooseTimeline, .chooseWeek, .chooseDay', this.chooseTimelineDay.bind(this));
		},

		chooseTimelineDay: function (event) {
			var $target = $(event.currentTarget),
				targetClass = $target.attr('class').match(/choose.*/),
				attr = $target.attr('attribute'),
				findAttr = {
					'chooseDay': 'td[day="' + attr + '"]',
					'chooseTimeline': 'td[timeline="' + attr + '"]',
					'chooseWeek': 'td[timeline]'
				};				

			if ($target.attr('checked')) {
				this.$table.find(findAttr[targetClass]).removeClass('selectedCell');
				$target.attr('checked', false);
			} else {
				this.$table.find(findAttr[targetClass]).addClass('selectedCell');
				$target.attr('checked', true);
			}
		},

		generateWeekItem: function () {
			var $elements = this.$table.find('.selectedCell .calendarCellDiv'),
				startDate = this.$table.attr('startDate'),
				weekItem = new This.Week({'startDate': startDate}),
				dayArray = this.getDays($elements),
				daysHash  = {},
				context = this,
				$day;	
				
			_.each(dayArray, function (dayNumber) {
				$day = $elements.parent('td[day=' + dayNumber + ']');

				$day.each(function (i, el) {
					daysHash[dayNumber] = context.getTimelinesByDay(dayNumber, $day);
				});

			}, this);

			weekItem.set('days', daysHash);
			return weekItem;
		},

		getDays: function ($elements) {
			var dayNumber,
				days = [];

			$elements.each(function (i, el) {
				dayNumber = $(el).parent().attr('day');
				if (days.indexOf(dayNumber) < 0) {
					days.push(dayNumber);
				};
			});

			return days;
		}, 

		getTimelinesByDay: function (dayNumber, $elements) {
			var id = [],
				rez = {};

			$elements.each( function (i, el) {
				id = [];

				$(el).children().each(function (i, child) {
					if ($(child).attr('event')) {
						id.push(Number($(child).attr('event')));
					}
				});

				rez[$(el).attr('timeline')] = id;
			});

			return rez;	
		},

		clonetoWeeks: function () {
			var weekNum = this.$el.find('.weeksNumber').val(),
				weekItem = this.generateWeekItem(),
				date = new Date(weekItem.get('startDate')),
				temp,
				i;

			for (i = 0; i < weekNum; i++) {
				date.setDate(date.getDate() + 7);
				temp = weekItem.clone();
				temp.set('startDate', date);

				this.checkResourcesConflicts(temp);
			}
		},

		clonetoDays: function () {
			var daysNum = this.$el.find('.weeksNumber').val(),
				weekItem = this.generateWeekItem(),
				cloneWeekItem = weekItem.clone(),
				dayCollection = cloneWeekItem.get('days'),
				clodeDayCollection = {},
				saturdayDayNumber = 6,
				i;

			_.each(dayCollection, function (day, dayNumber) {
				for (i = 0; i < daysNum; i++) {
					dayNumber ++;
					if (dayNumber < saturdayDayNumber) {
						this.addTimelinesToDay(day, dayNumber, clodeDayCollection);
						
					}
				}
			}, this);

			cloneWeekItem.set('days', clodeDayCollection);
			this.checkResourcesConflicts(cloneWeekItem);
		},

	
		addTimelinesToDay: function (day, dayNumber, cloneDaysCollection) {
			var events;
			if (cloneDaysCollection[dayNumber]) {
				_.each(day, function (event, timeline) {
					if (cloneDaysCollection[dayNumber][timeline]) {
						events = _.flatten(day[timeline]);
						cloneDaysCollection[dayNumber][timeline].push(events);	
					
						cloneDaysCollection[dayNumber][timeline] = _.flatten(cloneDaysCollection[dayNumber][timeline]);
					} else {
						cloneDaysCollection[dayNumber][timeline] = day[timeline];
					}
				});
			} else {
				cloneDaysCollection[dayNumber] = day;
			};
		},

		checkResourcesConflicts: function (weekItemToClone) {
			var daysToClone = weekItemToClone.get('days'),
				actualWeek = This.getWeekItemByDate(weekItemToClone.get('startDate')),
				actualDays,
				actualEvent, 
				isCellFonflict = false;
				event;
	
			this.conflicts = [];
			this.noConflicts = [];

			if (actualWeek) {
				actualDays = actualWeek.get('days');

				_.each(daysToClone, function (timelines, dayNumber) {
					_.each(timelines, function (eventsToCopy, timeline) {
							if (!actualDays[dayNumber] || !actualDays[dayNumber][timeline]) {
								this.addEventsToWeek({
									'startDate': actualWeek.get('startDate'),
									'dayNumber': dayNumber,
									'timeline': timeline,
									'events': eventsToCopy
								});
							} else {
								_.each(eventsToCopy, function (eventId) {
									event = collections.eventsCollection.findWhere({'id': eventId});
									isCellFonflict = false;

									_.each(actualDays[dayNumber][timeline], function (actualEventId) {

										if (eventId !== actualEventId) {
											event = collections.eventsCollection.findWhere({'id': eventId});
											actualEvent = collections.eventsCollection.findWhere({'id': actualEventId});

											if (actualEvent && !(_.isEmpty(_.intersection(event.get('resources'), actualEvent.get('resources'))))) 
											{
												this.conflicts.push(This.createWeekItem({
													'startDate': actualWeek.get('startDate'),
													'dayNumber': dayNumber,
													'timeline': timeline,
													'eventId': actualEventId
												}));

												this.noConflicts.push(This.createWeekItem({
													'startDate': actualWeek.get('startDate'),
													'dayNumber': dayNumber,
													'timeline': timeline,
													'eventId': eventId
												}));

												isCellFonflict = true;
											};

										};

									}, this);

									if (!isCellFonflict) {
										this.addEventsToWeek({
												'startDate': actualWeek.get('startDate'),
												'dayNumber': dayNumber,
												'timeline': timeline,
												'events': eventId
												});
									};
								}, this);
							}
						
					}, this);
				}, this);	
			} else {
				collections.scheduleCollection.addEvent(weekItemToClone);
			}
			
			this.solveConflict();
		},

		addEventsToWeek: function (options) {
			var weekItem = This.createWeekItem({
					'startDate': options.startDate,
					'dayNumber': options.dayNumber,
					'timeline': options.timeline,
					'eventId': options.events
			});

			collections.scheduleCollection.addEvent(weekItem);
			cs.mediator.publish('EventsCloned');
		},

		solveConflict: function () {
			var options = {};

			if (!_.isEmpty(this.conflicts)) {
				options = {
							'oldWeek': this.conflicts[0].clone(),
							'newWeek': this.noConflicts[0].clone()
						};

				if (this.isAsk) {
					this.showConfirm(this.deleteConflictEvent, this.solveConflict.bind(this), options);
				} else {
					if (this.action === 'newWeek') {
						this.deleteConflictEvent(options);
					};
				}
			
				this.conflicts.shift();
				this.noConflicts.shift();
			};

		},

		showConfirm: function (Yescallback, callback, options) {
			var confirmView = new This.ScheduleConfirmView();
            confirmView.set(Yescallback, callback, options);

            $('#confirm').html(confirmView.render().el);
		},

		deleteConflictEvent: function (options) {
			collections.scheduleCollection.deleteEvent(options.oldWeek);
			collections.scheduleCollection.addEvent(options.newWeek);

			cs.mediator.publish('EventsCloned');
		},

		cloneToSelectedDay: function (event) {
			var dayNumber = $(event.currentTarget).attr('attribute'),
				cloneWeekItem, 
				cloneDays = {};

			if (this.weekItem) {
				cloneWeekItem = this.weekItem.clone();

				_.each(this.weekItem.get('days'), function (day) {
					this.addTimelinesToDay(day, dayNumber, cloneDays);
				}, this);
				
				cloneWeekItem.set('days', cloneDays);
				cloneWeekItem.set('startDate', new Date(this.$table.attr('startdate')));
				
				this.checkResourcesConflicts(cloneWeekItem);
			};

			return false;
		},

		chooseWeekClone: function () {
			var cloneOptions = {
				'days': this.clonetoWeeks,
				'end': this.clonetoEndOfWeeks
			};

			if (cloneOptions[this.cloneParam]) {
				cloneOptions[this.cloneParam].call(this);
			};

			this.isAsk = true;
		},

		chooseDaysClone: function () {
			var cloneOptions = {
				'days': this.clonetoDays,
				'end': this.clonetoEndOfDays
			};

			if (cloneOptions[this.cloneParam]) {
				cloneOptions[this.cloneParam].call(this);
			};

			this.isAsk = true;
		},
		
		clonetoEndOfDays: function () {
			var weekItem = this.generateWeekItem(),
				weeksCollection = new This.Schedule(),
				weekItemToClone,
				currentDate,
				saturdayDayNumber = 6,
				sundayDayNumber = 0,
				event,
				finish,
				resources;

			_.each(weekItem.get('days'), function (day, dayNumber) {
				_.each(day, function (events, timeline) {
					_.each(events, function (id) {
						event = collections.eventsCollection.findWhere({'id': id});
						resources = this.getGroupsWithFinishDate(event);
				
						currentDate = new Date(weekItem.get('startDate'));
						currentDate.setDate(currentDate.getDate() + (dayNumber - 1));

						_.each(resources, function (finishDate, resourceId) {
							finish = new Date(finishDate);
						    debugger;
							while (currentDate <= finish) {
								currentDate.setDate(currentDate.getDate() + 1);
							
								if ((currentDate.getDay() < saturdayDayNumber ) && (currentDate.getDay() > sundayDayNumber)) {
									weekItemToClone = This.createWeekItem({
																'startDate': This.getFisrtDayOfWeek(currentDate),
																'dayNumber': currentDate.getDay(),
																'timeline': timeline,
																'eventId': id
									});
									weeksCollection.push(weekItemToClone);
								};
							};
						}, this);
					}, this);
				}, this)
			}, this);

			this.unionWeeks(weeksCollection);
		},

		clonetoEndOfWeeks: function () {
			var weekItem = this.generateWeekItem(),
				daysNumInWeek = 7,
				weekItemToClone,
				weeksCollection = new This.Schedule(),
				currentDate,
				event,
				finish,
				resources;

			_.each(weekItem.get('days'), function (day, dayNumber) {
				_.each(day, function (events, timeline) {
					_.each(events, function (id) {
						event = collections.eventsCollection.get(id);
						resources = this.getGroupsWithFinishDate(event);
				
						currentDate = new Date(weekItem.get('startDate'));
						currentDate.setDate(currentDate.getDate() + (dayNumber - 1));

						_.each(resources, function (finishDate, resourceId) {
							finish = new Date(finishDate);
							currentDate.setDate(currentDate.getDate() + daysNumInWeek);

							while (currentDate <= finish) {
								weekItemToClone = This.createWeekItem({
											'startDate': This.getFisrtDayOfWeek(currentDate),
											'dayNumber': currentDate.getDay(),
											'timeline': timeline,
											'eventId': id
									});
								weeksCollection.push(weekItemToClone);
								currentDate.setDate(currentDate.getDate() + daysNumInWeek);
							};
						}, this);
					}, this);
				}, this);
			},this);

			this.unionWeeks(weeksCollection);
		},

		unionWeeks: function (weeksCollection) {
			var weeksNumbers = _.uniq(weeksCollection.pluck('weekNumber')),
				weeks,
				weekToClone,
				daysToClone = {};

			_.each(weeksNumbers, function (weekNumber) {
				weeks = weeksCollection.where({'weekNumber': weekNumber});
				weekToClone = weeksCollection.findWhere({'weekNumber': weekNumber});

				_.each(weeks, function (week) {

					_.each(week.get('days'), function (day, dayNumber) {
						this.addTimelinesToDay(day, dayNumber, daysToClone);
					}, this);
				}, this);

				weekToClone.set('days', daysToClone);
				this.checkResourcesConflicts(weekToClone);

				daysToClone = {};
			}, this);
		},

		getGroupsWithFinishDate: function (event) {
			var resources = event.get('resources'),
				resType,
				oneRes,
				resourcesWithDate = {};

			_.each(resources, function (id) {
				oneRes = collections.resouresCollection.findWhere({'id': id});
				resType = oneRes.get('type');
				resType = collections.resourceTypes.findWhere({'id': Number(resType)});

				if (resType.get('name') === 'group') {
					resourcesWithDate[id] = oneRes.get('dateFinish');
				};
			}, this);

			return resourcesWithDate;
		}
	})
})(App.Schedule);