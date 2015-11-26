(function (This) {
	This.CalendarView = Backbone.View.extend({
		tagName: 'table',
		className: 'schedule table table-bordered',
		template: templates.calendarRowTpl,

		render: function () {
			this.renderGrid();
			this.delegateEvents();
			return this;
		},

		renderGrid: function () {
			var daysTpl = templates.daysRowTpl,
				$fragment = $(document.createDocumentFragment());

			this.setStartDate();
			$fragment.append(daysTpl({'startDate': this.startDate}));

			//return startDate value after template
			this.startDate.adjustDate(-4);

			_.each(This.timelines, function (value) {
				$fragment.append(this.template({'day': 1, 'timeline': value}));
			}, this);

			this.startDate = This.getFisrtDayOfWeek(this.startDate);

			this.$el.attr('startDate', This.getFisrtDayOfWeek(this.startDate));
			this.$el.html($fragment);
		},

		setStartDate: function () {
			var date = new Date();

			if (this.direction > 0)  {
				date.setDate(date.getDate() + 7 * this.direction);
			};
			
			if (this.direction < 0) {
				date.adjustDate(this.direction * 7);
			};

			this.startDate = This.getFisrtDayOfWeek(date);

			this.currentWeekNumber = this.startDate.getWeekNumber();
		}		
	})
})(App.Schedule);