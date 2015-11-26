(function (This) {
	This.OneEventView = Backbone.View.extend({
		tagName: 'li',
		className: 'list-group-item SheduleEventsLi',

		events: {
			'click': 'sendEvent',
		    'mouseenter': 'showPreviewConflicts',
		    'mousedown': 'stopSelection'
		},

		sendEvent: function () {

			if (this.model.get('resources').length) {
				cs.mediator.publish('EventSelected', this.model);
			} else {
				cs.mediator.publish('EventSelected', null);
				cs.mediator.publish("Notice", 'There isn\'t any resources in chosen event');
			}
		},

		render: function () {
			this.delegateEvents();
			this.$el.attr('mouseenter', true);
			this.$el.html(this.model.get('name'));
			return this;
		},

		showPreviewConflicts: function () {
			cs.mediator.publish('EventPreviewConflictsSelected', this.model);
			
		},

		stopSelection: function () {
			return false;
		}
	})
})(App.Schedule);