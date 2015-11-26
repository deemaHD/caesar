'use strict';

var collections = {},
    templates = {},
    App = {};

setUp(App, [
    'Router', 'Month', 'MonthCollection', 
    'Controller', 'MonthCollectionView', 
    'Event', 'EventsCollection', 'Resource', 
    'ResourcesCollection', 'WeekView'
]);


$(function () {
    collections.events = new App.EventsCollection(eventsCollection);
    collections.resources = new App.ResourcesCollection(resourcesCollection);
    collections.weeks = new App.WeekCollection(scheduleCollection);
    
    App.mediator = new Mediator();
    
    var router = new App.Router();
    
    Backbone.history.start({pushState: false});
});

function setUp (parent, modules) {
    modules.forEach(function (module) {
        parent[module] = {};
    });
};