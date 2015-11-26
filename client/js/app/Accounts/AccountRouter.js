'use strict';

(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'Accounts': 'showAccountsView',
            'Accounts/new': 'createAccountView',
            'Accounts/:id/edit': 'editAccount',
            'Accounts*path': 'notFound'
        },

        initialize: function () {
            this.controller = new App.Accounts.Controller();
            this.controller.start();

            cs.mediator.subscribe('ShowAccounts', this.navigateAccounts, null, this);
            cs.mediator.subscribe('CreateAccount', this.navigateNewAccount, null, this);
            cs.mediator.subscribe('EditAccount', this.navigateEditAccount, null, this);
            cs.mediator.subscribe('EditAccountById', this.navigateEditAccountById, null, this);
            cs.mediator.subscribe('CreateAccountViewClosed', this.navigateAccounts, null, this);

            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navigateAccounts: function () {
            this.navigate('Accounts');
        },

        navigateNewAccount: function () {
            this.navigate('Accounts/new');
        },

        navigateEditAccount: function (account) {
            this.navigate('Accounts/' + account.get('login') + '/edit');
        },

        navigateEditAccountById: function (id) {
            this.navigate('Accounts/' + id + '/edit');
        },

        showAccountsView: function () {
            this.controller.showAll();
        },

        createAccountView: function () {
            this.controller.createView();
        },

        editAccount: function (id) {
            this.controller.editViewById(id);
        },

        notFound: function () {
            cs.mediator.publish('Show404');
        }
    });
})(App.Accounts);




