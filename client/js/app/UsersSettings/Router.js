(function (This)  {
    This.Router = Backbone.Router.extend({
        routes: {
            'UserSetting': 'showUserSettings',
            'UserSetting*path': 'notFound'            
        },

        initialize: function () {
            var controller = new This.Controller();

            //URL navigation
            cs.mediator.subscribe('ShowUserSettings', this.navigateUserSettings, null, this);
            
            Backbone.history.loadUrl(Backbone.history.fragment);
        },

        navigateUserSettings: function () {
            this.navigate('UserSetting');
        },

        showUserSettings: function () {
            cs.mediator.publish('ShowUserSettings');
        },

        notFound: function () {
            cs.mediator.publish('Show404');
        }   
    });
})(App.UserSetting);