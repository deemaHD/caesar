(function (This) {
	This.MainView = Backbone.View.extend({
		initialize: function () {
			this.fullView = new This.ScheduleEventsView();

			this.views = {
				'schedule': new This.ScheduleView(),
				'events': new This.EventsView(),
				'pager': new This.PagerView(),
				'download': new This.DownloadView(),
				'weekMode': new This.WeekModeView(),
				'clone': new This.CloneEventsView(),
				'conflict': new This.ConflictsInCellView()
			};

			this.mode = 'allEvents';
			this.direction = 0;
		},

		setupEl: function (_el) {
			this.$el = _el;
		},

		setupTable: function () {
			this.$table = this.views['schedule'].getElement();

			this.views['weekMode'].setTableEl(this.$table);
			this.views['clone'].setTableEl(this.$table);
		},

		setAskValue: function (isAsk, priority) {
			this.views['clone'].setAskValue(isAsk, priority);
		},

		render: function () {
			_.each(this.views, function (view, viewName) {
				this.fullView.appendView(viewName, view.render().el);
			}, this);
			
			this.views['schedule'].renderEvents();
			this.$el.append(this.fullView.render().el);

			this.setupTable();
		},

		show: function () {
			this.fullView.show();
		},

		setupSelectedEvent: function (event) {
		 	this.selectedEvent = event;
		 	this.views['schedule'].setupSelectedEvent(event);
		 	this.views['weekMode'].setupSelectedEvent(event);
		 	this.views['schedule'].checkAvailableCells();

		 	if (this.mode === 'allEvents') {
		 		this.views['weekMode'].showAllEvents();
		 	} else {
		 		this.views['weekMode'].showSelectedEvent();
				
		 	};
		},

		showWeek: function (direction) {
			this.views['schedule'].remove();
			this.views['schedule'].setDirection(this.normalizeDirection(direction));
			this.fullView.appendView('schedule', this.views['schedule'].render().el);

			this.views['schedule'].renderEvents();
			this.views['schedule'].setupSelectedEvent(this.selectedEvent);

			this.$table = this.views['schedule'].getElement();
			this.checkAvailableCells();
			this.setupTable();
		},

		normalizeDirection: function (direction) {
			var directionToSend;

			if (direction !== null) {
				this.direction = direction;
				directionToSend = direction;
			} else {
				directionToSend = this.direction;
			};

			return directionToSend;
		},
		
		setupWeekMode: function (_mode) {
			this.mode = _mode;

			if (this.mode === 'allEvents') {
				this.views['weekMode'].showAllEvents();
			} else {
				this.views['weekMode'].setupSelectedEvent(this.selectedEvent);
				this.views['weekMode'].showSelectedEvent();
			};
		},

		showPreviewConflicts: function (event) {
			$('.conflictCell').remove();

			this.views['schedule'].checkAvailableCells(event);
		},

		checkAvailableCells: function () {
			this.views['schedule'].checkAvailableCells();
			this.views['conflict'].remove();
			this.fullView.appendView('conflict',  this.views['conflict'].render().el);
		},

		updateEvents: function () {
			this.views['events'].remove();
			this.fullView.appendView('events', this.views['events'].render().el);

			this.views['schedule'].remove();
			this.fullView.appendView('schedule', this.views['schedule'].render().el);

			this.views['schedule'].renderEvents();

			this.views['conflict'].remove();
			this.fullView.appendView('conflict',  this.views['conflict'].render().el);

			this.views['clone'].setTableEl(this.$table);

			this.views['clone'].delegateEvents();
		}, 

		updateConflicts: function () {
			this.views['conflict'].remove();
			this.fullView.appendView('conflict',  this.views['conflict'].render().el);
			this.views['schedule'].checkConglictsInCells();
		}
	})
})(App.Schedule);