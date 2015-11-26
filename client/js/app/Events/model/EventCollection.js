'use strict';
(function (This) {
    This.EventCollection = Backbone.Collection.extend({
        model: This.Event,
        url: '/events',

        comparator: function (model) {
            return model.get('name');
        },

        filterForSearch : function (searchRequest) {
            var filteredArray;

            filteredArray = this.filter(function (model) {
                return model.get('name').toLowerCase().indexOf(searchRequest.toLowerCase()) >= 0;
            });

            return new This.EventCollection(filteredArray);
        },

        filterByResource: function (resourceID) {
            var filtered;

            filtered = this.filter(function (event) {
                return event.get('resources').indexOf(resourceID) !== -1;
            });

            return new This.EventCollection(filtered);
        },

        getRelations: function (deletedModel) {
            var relations = this.where({'type': deletedModel.id});
            return relations;
        },


    });

})(App.Events);
