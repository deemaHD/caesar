(function (This) {
	This.ScheduleCellView = Backbone.View.extend({
		className: 'calendarCellDiv',
		tagName: 'div',
		model: App.Events.Event,
		template: templates.sheduleCellTpl,
		weekItem: null,

		events: {
			'click button': 'close',
			'click': 'click'
		},

		render: function () {
			var title = this.getEventTitle();

			this.$el.attr('resources', this.model.get('resources'));
			this.$el.attr('event', this.model.get('id'));
			this.$el.html(this.template({'title': title, 'value': this.model.get('name')}));
			return this;
		},

		getEventTitle: function () {
			var title = '',
				eventTypeId = this.model.get('type'),
				eventType = collections.eventTypes.get(eventTypeId);

			if (eventType) {
				title = eventType.get('name');
			};

			return title;
		},

		setTimeline: function (_timeline) {
			this.timeline = _timeline;
		},

		setDayNumber: function (_dayNumber) {
			this.dayNumber = _dayNumber;
		},

		setTable: function (_table) {
			this.$table = _table;
		},

		close: function () {
			var startDate = new Date(this.$table.attr('startDate')),
				weekItem = This.createWeekItem({'dayNumber': this.dayNumber, 
												'timeline': this.timeline, 
												'eventId': this.model.get('id'), 
												'startDate':startDate});

			weekItem.destroy();
			collections.scheduleCollection.deleteEvent(weekItem);
			this.remove();
			cs.mediator.publish('EventDeleted');
		},

		click: function (event) {
			(this.$el.parent().find('.conflictCell').length) && (event.stopPropagation());
		}
	});
})(App.Schedule);