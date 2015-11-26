(function (This) {
    This.Controller = function () {
        var startDate = new Date(),
            monthView = new App.MonthView(),
            $main = $('#main');
        
        start();
        
        function start () {    
            setUpMediator();
            renderCalendar();
        }
        
        function setUpMediator () {
            App.mediator.subscribe('ShowCalendar', showCalendar, {}, this);
            App.mediator.subscribe('ShowWeek', showWeek, {}, this);
            App.mediator.subscribe('ShowWeekById', showWeekById, {}, this);
            App.mediator.subscribe('ShowSchedule', showSchedule, {}, this);
            App.mediator.subscribe('ShowScheduleById', showScheduleById, {}, this);
        }
        
        function renderCalendar () {
            $('#main').append(monthView.render(startDate).el);
        }
        
        function showCalendar () {
            $('.calendar').removeClass('hiden');
            $('.preview').remove();
            $('.schedule').remove();
        }
        
        function showWeek (previewWeek) {
            hideAll();
            var weekPreView = new WeekPreView({model: previewWeek});
            
            $('#main').append(weekPreView.render(previewWeek.id).el);
        }
        
        function showWeekById (id) {
            getWeekById(id, showWeek);
        }
        
        function showSchedule (resourceId, weekId) {
            hideAll();
            var weekView = new App.WeekView();
            
            $('#main').append(weekView.render(resourceId, weekId).el);
        }
        
        function showScheduleById (weekId, resourceId) {
            showSchedule(resourceId, weekId);
        }
        
        function hideAll () {
            $('#main').children().addClass('hiden');
        }
        
        function getWeekById (id, callback) {
            var weeks = collections.weeks.toJSON();
            _.each(weeks, function (week) {
                if (week.id == id) {
                    callback(week);
                }    
            }, this);

        }
    }
})(App);