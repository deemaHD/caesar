'use strict';
(function (This) {
    This.Controller = function () {
        var $menu = $('#navbar');

        start();
        
        function start () {
            renderMenu();
        }

        function renderMenu (){
            var menuView = new This.MenuView();
            $menu.append(menuView.render().$el);
        }

    }
})(App.Menu);