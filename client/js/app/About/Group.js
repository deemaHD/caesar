"use strict";

(function (This)  {
    This.Group = Backbone.Model.extend({

        defaults: {
            'id': '',
			'name': '',
            'itaName': '',
            'courseDirection': '',
            'students': ''
        }
    });
})(App.About);