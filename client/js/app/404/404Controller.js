(function (This)  {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'Show404': 'showAll'
        },

        initialize: function () {
            this.collectionView = new This.ErrorPageView();
            this.el = $('#main');
            this.mediator = cs.mediator;
            this.start();
        }
    });
})(App.ErrorPage);