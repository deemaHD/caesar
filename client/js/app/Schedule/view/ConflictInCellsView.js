(function (This) {
	This.ConflictsInCellView = Backbone.View.extend({
		template: templates.conflictsInCellsViewTpl,

		checkConflicts: function () {
			var conflictDate;

			this.dateCollection = [];

			collections.scheduleCollection.each(function (week) {
				_.each(week.get('days'), function (timelines, dayNumber) {
					_.each(timelines, function (eventsId, timeline) {		
						if (This.isConflicts(eventsId)) {
							conflictDate = new Date(week.get('startDate'));
							conflictDate.setDate(conflictDate.getDate() + (dayNumber - 1));
					
							this.dateCollection.push(conflictDate.toDateString());
						}
					}, this);
				}, this);
			}, this);

			this.dateCollection = _.uniq(this.dateCollection);
		},

		showConflicts: function () {
			this.conflicts = '';
			_.each(this.dateCollection, function (date) {
				this.conflicts = this.conflicts + date + '<br>';
			}, this);
		},

		render: function () {
			this.checkConflicts();
			this.showConflicts();

			if (!_.isEmpty(this.dateCollection)) {
				this.$el.html(this.template({'value': this.conflicts}));
			} else {
				this.$el.html('');
			};

			return this;
		}
	})
})(App.Schedule);
