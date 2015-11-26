'use strict';

var App = {},
    cs = {},
    collections = {},
    hashToDelete = {},
    templates = {},
    ESC = 27,
    ENTER = 13;

setUp(App, ['Events', 'Resources', 'About', 'Menu', 'Messenger', 'Schedule', 'ErrorPage', 'Settings', 'Accounts', 'Holidays', 'SchedulePreview', 'UserSetting']);
setUp(cs, ['mediator', 'subRouters', 'router', 'menu', 'messenger', 'notFound']);

setUp(collections, ['resouresCollection',
                    'eventsCollection',
                    'scheduleCollection',
                    'eventTypes',
                    'resourceTypes',
                    'holidaysCollection',
                    'accountsCollection',
                    'citiesCollection',
                    'countriesCollection'
                    ]);

$(function () {
    var dataLoader = new DataLoader();
    dataLoader.loadCollections(main);
    
    function main () {
        cs.mediator = new Mediator();
        cs.router = new App.Router();
        cs.messenger = new App.Messenger.Controller();
        cs.subRouters = {};
        cs.menu = new App.Menu.Controller();
        cs.notFound = new App.ErrorPage.Controller();
        Backbone.history.start({pushState: true});
    }
});