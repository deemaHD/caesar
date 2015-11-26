'use strict';
(function (This) {
    This.Controller = function () {
        var settingsView = new App.Settings.SettingsView(),
            $main = $('#main'),
            api;

        api = {
            showAll: showAll
        };

        start();

        function start () {
            hideAll();
            $main.append((settingsView.render().el));
        }

        function showAll () {
            hideAll();
            settingsView.show();
        }

        function hideAll () {
            $main.children().addClass('hidden');
        }

        return api;
    }
})(App.Settings);