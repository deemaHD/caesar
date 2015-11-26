var WeekPreView = Backbone.View.extend({
    tagName: 'table',
    className: 'modal-preview',
    
    template: templates.weekPreviewTpl,
    
    events: {
        'click td.resource': 'renderWeek',
        'click .back': 'backToCalendar'
    },
    
    render: function (weekId) {
        var eventsId = this.getEventsId(),
            resourcesId = this.getResourcesId(eventsId),
            weekRersources = this.getResourcesById(resourcesId);
        
        this.currentWeekId = weekId;

        this.$el.append(this.template({resources: weekRersources}));
        
        return this;
    },
    
    renderWeek: function (e) {
        var resourceId = e.target.classList[0],
            weekId = this.currentWeekId;
        
        cs.mediator.publish('ShowSchedule', resourceId, weekId);
    },
    
    getEventsId: function () {
        var eventsId = [];
        
        _.each(this.model.days, function (days) {
            _.each(days, function (eventId) {
                _.each(eventId, function (id) {
                    eventsId.push(id);
                });
            });
        });
        
        return eventsId;
    },
    
    getResourcesId: function (eventsId) {
        var events = collections.eventsCollection.toJSON(),  //events collection
            resourcesId = [];
        
        _.each(events, function (event) {
            _.each(eventsId, function (id) {
                if (id === event.id) {
                    resourcesId.push(event.resources);
                }
            });
        });
        
        resourcesId = _.flatten(resourcesId);
        resourcesId = _.unique(resourcesId);
        
        return resourcesId;
    },
    
    getResourcesById: function (resourcesId) {
        var resourcesCollection = collections.resouresCollection.toJSON(), //resources collection
            weekResources = [];
        
        _.each(resourcesCollection, function (resource) {
            _.each(resourcesId, function (id) {
                if (id === resource.id && resource.useInSchedule) {
                    weekResources.push(resource);
                }
            });
        });
        
        return weekResources;
    },
    
    backToCalendar: function () {
        cs.mediator.publish('ShowCalendar');
    }
});