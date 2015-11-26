'use strict';
(function (This) {
    This.CountriesCollection = Backbone.Collection.extend({
        model: This.Country,
        url: '/countries',

        getNameById: function (id) {
            var model = this.get(id);
            return model.get('countryName');
        },

        getRelationsViaCities: function (collection, citiesId) {	
        	var relations = [],
        		itemArray = [];
        		_.each(citiesId, function (id) {
           			 relations = collection.where({'locationCity': id});
                	if (relations.length > 0) {
                    	_.each(relations, function (item) {
                        	itemArray.push(item);
                    	});
                	}
        		}); 
        	return itemArray;
        },

        getRelationsWithCities: function (deletedModel) {
        	var relations = collections.citiesCollection.where({'location': deletedModel.id});
        	return relations;
        },

        getRelationsWithHolidays: function (deletedModel) {
        	var relations = collections.holidaysCollection.where({'locationCountry': deletedModel.id});
        	return relations;
        }
    });
})(App.Settings);
