"use strict";

(function (This) {
    This.GroupCollection = Backbone.Collection.extend({

        url: '/contributors',

        model: This.Group
    });

})(App.About);