(function (This) {
    This.Router = Backbone.Router.extend({
        routes: {
            '': 'mainView',
            'calendar': 'mainView',
            'week/:id': 'showWeek',
            'week/:weekId/resource/:idResource': 'showSchedule'
        },

        initialize: function () {
            this.controller = new This.Controller();
            
            This.mediator.subscribe('ShowWeek', this.navigateShowWeek, {}, this);
            This.mediator.subscribe('ShowCalendar', this.navigateShowCalendar, {}, this);
            This.mediator.subscribe('ShowSchedule', this.navigateShowSchedule, {}, this);
        },
        
        mainView: function () {
            This.mediator.publish('ShowCalendar');
        },
        
        navigateShowWeek: function (week) {
            var weekId = week.id;
            
            if (weekId !== undefined) {
                this.navigate('week/' + week.id);    
            } else {
                this.navigate('week/empty');
            }
        },
        
        navigateShowCalendar: function () {
            this.navigate('calendar');    
        },
        
        navigateShowSchedule: function (idResource, weekId) {
            this.navigate('week/' + weekId + '/resource/' + idResource);    
        },
        
        showWeek: function (id) {
            This.mediator.publish('ShowWeekById', id);
        },
        
        showSchedule: function (weekId, idResource) {
            This.mediator.publish('ShowScheduleById', weekId, idResource);
        }
    });
})(App);