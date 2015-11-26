"use strict";

(function (This) {
    This.ContributorCollection = Backbone.Collection.extend({

        url: '/contributors',

        model: This.Contributor

    });

})(App.About);