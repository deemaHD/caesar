(function (This) {
    This.Week = Backbone.Model.extend({
        defaults: {
            'id': 0,
            'startDate': '',
            'days': {}
        }
    });
})(App);