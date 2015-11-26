(function (This) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'CreateAccount': 'createView',
            'EditAccount': 'editView',
            'CreateAccountViewClosed': 'viewClosed'
        },

        initialize: function () {
            this.collection = collections.accountsCollection;
            this.collectionView = new This.AccountCollectionView();
            this.createEditView = This.CreateEditAccountView;
            this.el = $('#main');
            this.mediator = cs.mediator;
        },

        editViewById: function (login) {

            var model = this.collection.findWhere({'login': login});
            if (model) {
                this.editView(model);
            } else {
                cs.mediator.publish('Show404');
            }
        }
    });
})(App.Accounts);