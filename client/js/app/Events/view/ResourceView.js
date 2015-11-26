'use strict';
(function (This){
    This.ResourceView = Backbone.View.extend({
        tagName: 'li',
        className: 'list-group-item resource',

        events: {
            'click': 'selectResource'
        },

        render: function () {
            this.$el.html(this.model.get('name'));

            return this;
        },

        selectResource: function () {
            cs.mediator.publish('resourceAddedToEvent', this.model);
        }

    });
})(App.Events);