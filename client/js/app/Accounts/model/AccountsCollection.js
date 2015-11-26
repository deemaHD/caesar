'use strict';
(function (This) {
    This.AccountsCollection = Backbone.Collection.extend({
        model: This.Account,
        url: '/accounts',

        isLoginTaken: function (value) {
            var accounts = this.toJSON(),
                logins = [],
                result;

            accounts.forEach(function (element) {
                logins.push(element['login']);
            });
                        
            result = _.contains(logins, value); 
            return result;
        },

        checkForUnique: function (_login) {
            var accountsCollection = this.toJSON(),
                login = _login;
            
            _.each(accountsCollection, function (account) {
               if (login === account.login) {
                   login = Generator.uniqualization(login);
               }
            });
            
            return login;
        }     	
    });

})(App.Accounts);
