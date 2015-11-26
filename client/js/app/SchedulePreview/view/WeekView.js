(function (This) {
    This.WeekView = Backbone.View.extend({
        tagName: 'table',
        className: 'modal-schedule',
        
        template: templates.weekTpl,
        
        render: function (resourceId, currentWeekId) {
            var week = this.getCurrentWeek(currentWeekId),
                eventsWithResources = this.getEventsWithResource(resourceId),
                eventsForWeek = this.createWeekView(week.days, eventsWithResources);

            this.$el.append(this.template({
                    resources: eventsForWeek, 
                    week: week, 
                    events: collections.eventsCollection.toJSON(),   //events collection
                    resourcesCollection: collections.resouresCollection.toJSON()
                }));
            
            return this;
        },
        
        getCurrentWeek: function (_currentWeekId) {
            var currentWeek = {},
                weeks = App.SchedulePreview.weeks,    //weeks collection
                currentWeekId = Number(_currentWeekId);
            
            _.each(weeks, function (week) {
                if (currentWeekId === week.id) {
                    currentWeek = week;
                }    
            });

            return currentWeek;
        },
        
        getEventsWithResource: function (resourceId) {
            var events = [];

            collections.eventsCollection.toJSON().forEach(function (event) {  //events collection
                event.resources.forEach(function (resource) {
                    if (resource == resourceId) {
                        events.push(event);
                    }
                }, this);
            }, this);
            
            return events;
        },
        
        createWeekView: function (days, eventsWithResources) {
            var eventsForWeek = {
                '1': {},
                '2': {},
                '3': {},
                '4': {},
                '5': {}
            };
            
            _.each(days, function (daysEvent, dayNumber) {
                var day = dayNumber;
                _.each(daysEvent, function (events, timeline) {
                    var time = timeline;
                    _.each(events, function (event) {
                        _.each(eventsWithResources, function (eventWithResource) {
                            _.each(events, function (eventId) {
                                if (eventId == eventWithResource.id) {
                                    console.log(eventId);
                                    eventsForWeek[day][time] = eventId;
                                }
                            });
                        }, this);     
                    }, this);  
                }, this);
            }, this);
            
            return eventsForWeek;
        } 
    });
})(App);