(function (This) {
	This.EventsView = Backbone.View.extend({
		tagName: 'ul',
		className: 'list-group',
		$fragment: null,

		events: {
			'click': 'selectItem',
		},

		initialize: function () {
			this.$el.parent().addClass('list-group');
			this.liCollection = [];
		},

		selectItem: function (event) {

			if (Object.is(this.selectedEvent, event.target)) {
				$(event.target).removeClass('active');
				
				cs.mediator.publish('EventSelected', null);
				this.selectedEvent = null;

				this.liCollection.forEach( function (li) {
					li.delegateEvents();
				});
			} else {
				this.$el.children().removeClass('active');
				$(event.target).addClass('active');
				this.selectedEvent = event.target;

				this.liCollection.forEach( function (li) {
					li.undelegate('mouseenter');
				});
			}
			
		},

		render: function () {
			this.$fragment = $(document.createDocumentFragment());
			this.$fragment.append('Events:');
			
			collections.eventsCollection.each(this.renderOne.bind(this));
			this.$el.html(this.$fragment);
			this.delegateEvents();
			return this;
		},

		renderOne: function (event) {
			var eventView = new This.OneEventView({model:event});
			this.$fragment.append(eventView.render().el);

			this.liCollection.push(eventView);
		}
	})
})(App.Schedule);