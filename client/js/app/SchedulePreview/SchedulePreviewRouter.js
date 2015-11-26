(function (This) {
	This.Router = Backbone.Router.extend({
        routes: {
            'Schedule/Preview': 'mainView',
            'Schedule/Preview/week/:id': 'showWeek',
            'Schedule/Preview/week/:weekId/resource/:idResource': 'showSchedule'
        },

        initialize: function () {
            this.controller = new App.SchedulePreview.Controller();
            
            cs.mediator.subscribe('ShowWeek', this.navigateShowWeek, {}, this);
            cs.mediator.subscribe('ShowCalendar', this.navigateShowCalendar, {}, this);
            cs.mediator.subscribe('ShowSchedule', this.navigateShowSchedule, {}, this);
            
            Backbone.history.loadUrl(Backbone.history.fragment);
        },
        
        mainView: function () {
            cs.mediator.publish('ShowCalendar');
        },
        
        navigateShowWeek: function (week) {
            var weekId = week.id;
            
            if (weekId !== undefined) {
                this.navigate('Schedule/Preview/week/' + weekId);    
            } else {
                this.navigate('Schedule/Preview/week/empty');
            }
        },
        
        navigateShowCalendar: function () {
            this.navigate('Schedule/Preview');    
        },
        
        navigateShowSchedule: function (idResource, weekId) {
            this.navigate('Schedule/Preview/week/' + weekId + '/resource/' + idResource);    
        },
        
        showWeek: function (id) {
            cs.mediator.publish('ShowWeekById', id);
        },
        
        showSchedule: function (weekId, idResource) {
            cs.mediator.publish('ShowScheduleById', weekId, idResource);
        }
    });
})(App.SchedulePreview);