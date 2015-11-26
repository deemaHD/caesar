(function (This) {
    This.ResourcesCollection = Backbone.Collection.extend({
        model: This.ResourcesModel,
        url: '/resources',

        comparator: function (resource) {
            return resource.get('name');
        },

        filterForSearch : function (searchRequest) {
            var filteredArray;

            filteredArray = this.filter(function (model) {
                return model.get('name').toLowerCase().indexOf(searchRequest.toLowerCase()) >= 0;
            });

            return new This.ResourcesCollection(filteredArray);
        },

        filterByType: function (filter) {
            var filteredArray = this.where({type: Number(filter)});

            return new This.ResourcesCollection(filteredArray);
        },

        getRelations: function (deletedModel) {
            relations = this.where({'type': deletedModel.id});
            return relations;
        }
    });
})(App.Resources);