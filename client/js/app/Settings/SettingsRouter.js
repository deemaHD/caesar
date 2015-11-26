'use strict';
(function (This) {
    This.Router = Backbone.Router.extend({
        routes: {
            'Settings': 'getSettings',
            'Settings*path': 'notFound'
        },

        initialize: function () {
            this.controller = new App.Settings.Controller();
        },

        getSettings: function () {
            this.controller.showAll();
        },

        notFound: function () {
            cs.mediator.publish('Show404');
        }

    });
})(App.Settings);