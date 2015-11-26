'use strict';
(function (This) {
    This.EventTypeCollection = Backbone.Collection.extend({
        model: This.EventType,

        url: '/eventTypes',

        getNameById: function (id) {
            var model = this.get(id);
            return model.get('name');
        }
    });
})(App.Settings);