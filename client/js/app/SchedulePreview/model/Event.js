(function (This) {
    This.Event = Backbone.Model.extend({
        defaults: {
            'id': 0,
            'name': '',
            'type': '',
            'resources': []
        }
    });
})(App);