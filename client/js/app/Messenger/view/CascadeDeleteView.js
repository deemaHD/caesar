'use strict';
(function (This) {
    This.CascadeDeleteView = This.ConfirmView.extend({
        className: 'modal fade in hidden',

        template: templates.cascadeDeleteTpl,

        set: function (message, relations, callback) {
            this.message = message;
            this.relations = relations;
            this.callback = callback;
        },

        render: function () {
            this.$el.html(this.template({
                message: this.message,
                relations: this.relations
            }))
                .removeClass('hidden');

            return this;
        }
    });
})(App.Messenger);