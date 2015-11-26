"use strict";

(function (This)  {
    This.Contributor = Backbone.Model.extend({

        defaults: {
            'id': '',
            'firstName': '',
            'lastName': '',
            'contributorTeamId': ''
        }
    });
})(App.About);