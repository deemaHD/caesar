(function(This) {
	This.WeekModeView = Backbone.View.extend({
		template: templates.weekModeTpl,

		events: {
			'click .allEvents': 'getWeekModeAll',
			'click .selectedEvent': 'getWeekModeSelected',
		},

		render: function () {
			this.$el.html(this.template());
			return this;
		},

		setTableEl: function (_table) {
			this.$table = _table;
		},

		showAllEvents: function () {
			this.$table.find('.calendarCellDiv').show();
		},

		showSelectedEvent: function () {
			var elements;
			this.$table.find('.calendarCellDiv').hide();

			if (this.selectedEvent) {
				elements = this.$table.find('div[event="' + this.selectedEvent.get('id') + '"]');
				elements.show();
			}
		},

		setupSelectedEvent: function (event) {
			this.selectedEvent = event;
		},

		getWeekModeSelected: function () {
			cs.mediator.publish('WeekModeSelected', 'selectedEvent');
			this.$el.find('.weekModeCaption').html('Weeks mode: Selected Event');
		},

		getWeekModeAll: function () {
			cs.mediator.publish('WeekModeSelected', 'allEvents');
			this.$el.find('.weekModeCaption').html('Weeks mode: All Events');
		}
	})
})(App.Schedule);