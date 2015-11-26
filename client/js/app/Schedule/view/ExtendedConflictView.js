(function (This) {
	This.ExtendedConflictView = Backbone.View.extend({
		className: 'extendedConflictCell',
		$frag: null,

		setEvents: function (_events) {
			this.eventsId = _events;
		},

		render: function () {
			this.findConflicts();
			return this;
		},

		showConflicts: function () {
			var res,
				resType;

			this.$frag = $(document.createDocumentFragment());

			_.each(this.conflicts, function (id) {
				res = collections.resouresCollection.findWhere({'id': id});
				if (res) {
					resType = collections.resourceTypes.findWhere({'id': res.get('type')});
					this.$frag.append(resType.get('name') + ':');

					this.$frag.append(res.get('name') + '<br>');
				}
			}, this);

			this.$el.html(this.$frag);
		},

		findConflicts: function () {
			var resources = [],
				event,
				i;

			this.conflicts = [];

			if (this.eventsId) {
				_.each(this.eventsId, function (id) {
					event = collections.eventsCollection.findWhere({'id': id});
					if (event) {
						resources.push(event.get('resources'));
					};
				}, this);
				
				for (i = 0; i < this.eventsId.length - 1; i++) {
					this.conflicts.push(_.intersection(resources[i], resources[i + 1]));
				};

				this.conflicts = _.flatten(this.conflicts);
				this.showConflicts();
			};
		}

	});
})(App.Schedule);