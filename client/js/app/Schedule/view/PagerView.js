(function (This) {
	This.PagerView = Backbone.View.extend({
		template: templates.schedulePagerTpl,
		nextNumber: 0,

		events: {
			'click .next': 'showNext',
			'click .previous': 'showPrevious',
			'click .current': 'showCurrent'
		},

		showNext: function () {
			cs.mediator.publish('DiffWeekSelected', ++this.nextNumber);
		},

		showPrevious: function () {
			cs.mediator.publish('DiffWeekSelected', --this.nextNumber);
		},

		showCurrent: function () {
			this.nextNumber = 0;
			cs.mediator.publish('DiffWeekSelected', this.nextNumber);
		},

		render: function () {
			(this.$el).html(this.template());
			return this;
		},
	})
})(App.Schedule);