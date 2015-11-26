'use strict';
(function (This) {
    This.CitiesCollection = Backbone.Collection.extend({
        model: This.City,
        url: '/cities',

        getNameById: function (id) {
            var model = this.get(id);

            return model.get('name');
        },

        getCitiesId: function (deletedModel) {
    		var relationsCities = this.where({'location': deletedModel.id}),
        		arrayId = [];
    		_.each(relationsCities, function (item) {
        		arrayId.push(item.id);
    		});
    		return arrayId;
		},

		getRelations: function (deletedModel, collection) {
			var relations = collection.where({'locationCity': deletedModel.id});
			return relations;
		}
    });

})(App.Settings);
