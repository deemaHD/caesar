(function (This) {
    This.Resource = Backbone.Model.extend({
        defaults: {
            'id': 0,
            'name': '',
            'type': ''
        }
    });
})(App);