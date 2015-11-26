'use strict';
(function (This) {
    This.ConfirmView = Backbone.View.extend({
        className: 'modal fade in hidden',

        template: templates.confirmTpl,

        events: {
            'click .delete': 'delete',
            'click .cancel': 'close'
        },

        initialize: function () {
            $('body').one('keydown', this.checkKeyCommand.bind(this));
        },

        set: function (message, callback) {
            this.message = message;
            this.callback = callback;
        },

        render: function () {
            this.$el.html(this.template({message: this.message}))
                .removeClass('hidden');

            return this;
        },

        delete: function () {
            this.callback();
            this.remove();
        },

        close: function () {
            this.remove();
            emptyHash();
        },

        checkKeyCommand: function (e) {
            if (e.keyCode === ESC) {
                this.remove();
            }

            if (e.keyCode === ENTER) {
                this.delete();
            }
        }
    });
})(App.Messenger);