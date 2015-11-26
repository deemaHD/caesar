(function (This) {
        This.Controller = function () {
        App.SchedulePreview.weeks = setUpWeeksCollection();
            
        var startDate = new Date(),
            monthView = new App.MonthView();
        
        start();
        
        function start () {
            setUpMediator();
        }
            
        function setUpWeeksCollection () {
            var currentMonth = new Date().getMonth(),
                weeksCollection = [];

            weeksCollection = collections.scheduleCollection.toJSON();
            return weeksCollection;
        }
        
        function setUpMediator () {
            cs.mediator.subscribe('ShowCalendar', showCalendar, {}, this);
            cs.mediator.subscribe('ShowWeek', showWeek, {}, this);
            cs.mediator.subscribe('ShowWeekById', showWeekById, {}, this);
            cs.mediator.subscribe('ShowSchedule', showSchedule, {}, this);
            cs.mediator.subscribe('ShowScheduleById', showScheduleById, {}, this);
            cs.mediator.subscribe('RenderCalendar', renderCalendar, {}, this);            
        }
            
        function renderCalendar () {
            $('div.schedule-preview').html(monthView.render(startDate).el);
        }
        
        function showCalendar () {
            $('.modal-calendar').removeClass('hiden');
            $('.modal-preview').remove();
            $('.modal-schedule').remove();
        }
        
        function showWeek (previewWeek) {
            hideAll();
            var weekPreView = new WeekPreView({model: previewWeek});
            
            $('.schedule-preview').append(weekPreView.render(previewWeek.id).el);
        }
        
        function showWeekById (id) {
            getWeekById(id, showWeek);
        }
        
        function showSchedule (resourceId, weekId) {
            hideAll();
            var weekView = new App.WeekView();
            
            $('.schedule-preview').append(weekView.render(resourceId, weekId).el);
        }
        
        function showScheduleById (weekId, resourceId) {
            showSchedule(resourceId, weekId);
        }
        
        function hideAll () {
            $('.schedule-preview').children().addClass('hiden');
        }
        
        function getWeekById (id, callback) {
            var weeks = App.SchedulePreview.weeks; //weeks collection
            _.each(weeks, function (week) {
                if (week.id == id) {
                    callback(week);
                }    
            }, this);

        }
    };
})(App.SchedulePreview);