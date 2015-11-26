(function (This) {
    This.EditEventView = App.Events.CreateEditView.extend({
        // all code in App.Events.CreateEditView
        changeClassAndCancel: function () {
            $('body').css('overflow-y', 'auto');
            cs.mediator.publish('EventViewClosed');  //to This.controller
        }
    });
})(App.Resources);