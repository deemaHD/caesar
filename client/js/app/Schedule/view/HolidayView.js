(function (This) {
	This.HolidayView = Backbone.View.extend({
		className: 'holidayCell',
		model: App.Holidays.HolidaysModel,
		template: templates.holidayViewTpl,

		events: {
			'click': 'stopPropagation'
		},

		render: function () {
			this.$el.html(this.template({'value': this.model.get('name')}));
			return this;
		},

		stopPropagation: function () {
			return false;

		},

	})
})(App.Schedule);