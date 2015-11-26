(function (This) {
    This.Controller = function () {
        var userSettingsView = new This.UserSettingsView(),
            $main = $('#main');
        
        start();
        
        function start () {
            renderSettings();
            cs.mediator.subscribe('ShowUserSettings', showAll);
        }
        
        function renderSettings () {
            $main.append(userSettingsView.render().el);
        }
        
        function showAll () {
            userSettingsView.show();
        }
        
        function hideAll () {
            $main.children().addClass('hidden');
        }
    }
})(App.UserSetting);