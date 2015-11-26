(function (This) {
    This.HolidaysCollection = Backbone.Collection.extend({
        model: This.HolidaysModel,
        url: '/holidays',

        comparator: function (model) {
            return model.get('name');
        },

        filterForSearch: function (searchRequest) {
            var filteredArray;

            filteredArray = this.filter(function (model) {
                return model.get('name').toLowerCase().indexOf(searchRequest.toLowerCase()) !== -1;
            });

            return new This.HolidaysCollection(filteredArray);
        },

        filterByCountry: function (filter) {
            var filteredArray = this.where({locationCountry: Number(filter)});

            return new This.HolidaysCollection(filteredArray);
        }
    });
})(App.Holidays);