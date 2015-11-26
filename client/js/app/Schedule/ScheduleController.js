(function (This) {
	This.Controller = function () {
		var mainView = new This.MainView(),
			$el = $('#main');
	
		start();

		function start () {
			setupMediator();
			mainView.setupEl($el);
			showScheduleEvents();
			setupEvents();
			setupHolidays();
			setupSchedule();
		}
		
		function setupMediator () {
			cs.mediator.subscribe('ScheduleSelected', showSchedule);
			cs.mediator.subscribe('EventSelected', setupSelectedEvent);
			cs.mediator.subscribe('DiffWeekSelected', showWeek);	
			cs.mediator.subscribe('WeekModeSelected', setupWeekMode);
			cs.mediator.subscribe('EventPreviewConflictsSelected', showPreviewConflicts);
			cs.mediator.subscribe('EventDeleted', checkAvailableCells);
			cs.mediator.subscribe('EventsCloned', showWeek);
			cs.mediator.subscribe('ShowPreView', showPreView);
			cs.mediator.subscribe('NotToAskResponse', setAskValue);
			cs.mediator.subscribe('EventDeletedFromCollection', updateEvents);
		}

		function showScheduleEvents () {
			mainView.render();
		}
		
		function showPreView () {
			var preView,
			    el = $('#main');
			preView && preView.remove();
	        preView = new This.PreView();
			el.append(preView.render().el);
            cs.mediator.publish('RenderCalendar'); //publish to Schedule Preview Controller
		}
		
		function setAskValue (isAsk, priority) {
		 	mainView.setAskValue(isAsk, priority);
		}

		function setupEvents () {
			collections.eventsCollection.on('update', updateEvents);
			collections.eventsCollection.on('change', updateEvents);
		}

		function setupSchedule () {
			collections.scheduleCollection.on('change', updateConflicts);
		}

		function setupHolidays() {
			collections.holidaysCollection.on('update', showWeek);
			collections.holidaysCollection.on('change', showWeek);
		}

		function updateEvents () {
			mainView.updateEvents();
		}

		function showSchedule () {
		 	hideAll();
		 	mainView.show();
		}

		function updateConflicts () {
			mainView.updateConflicts();
		}

		function setupSelectedEvent (event) {
		 	mainView.setupSelectedEvent(event);
		}

		function showWeek (direction) {
			direction = (typeof(direction) === 'number')? direction: null;
			mainView.showWeek(direction);
		}

		function setupWeekMode (_mode) {
			mainView.setupWeekMode(_mode);
		}

		function showPreviewConflicts (event) {
			mainView.showPreviewConflicts(event);
		}

		function checkAvailableCells () {
			mainView.checkAvailableCells();
		}

		function hideAll () {
		 	$('#main').children().addClass('hidden');
		}
	}
})(App.Schedule);