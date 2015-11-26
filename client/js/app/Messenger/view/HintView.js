'use strict';

(function (This) {
    var HINT_HEIGHT = 40;

    This.HintView = Backbone.View.extend({
        className: 'hint hidden',

        set: function (message, $target) {
            this.message = message;
            this.$target = $target;
        },

        render: function () {
            var offset = this.$target.position();

            offset.top -= HINT_HEIGHT;

            this.$el.parent().css({
                position: 'relative'
            });

            this.$el.html(this.message)
                .removeClass('hidden')
                .css({
                    top: offset.top + 'px',
                    right: '0px'
                });

            this.$target
                .on('focus', this.leaveItAlone.bind(this))
                .parent()
                .addClass('has-error');

            setTimeout(this.remove.bind(this), 5000);

            return this;
        },

        leaveItAlone: function () {
            this.$target.parent().removeClass('has-error');
            this.remove();
        }
    });
})(App.Messenger);