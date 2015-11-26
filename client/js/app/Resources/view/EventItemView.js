'use strict';
(function (This) {
    This.EventItemView = Backbone.View.extend({
        tagName: 'tr',
        className: '',
        tpl: templates.eventForEditTpl,

        events: {
            'click .edit': 'edit',
            'click .dell': 'delete',
            'dblclick': 'edit'
        },

        render: function () {
            var eventType = collections.eventTypes.get(this.model.get('type')),
                eventTypeName = eventType.get('name');
            this.$el.html(this.tpl({
                name: this.model.get('name'),
                type: eventTypeName
            }));

            return this;
        },

        edit: function () {
            cs.mediator.publish('EditEventClicked', this.model); //publish to resource Controller
        },

        delete: function () {
            this.model.destroy();
            this.remove();
            cs.mediator.publish('Notice', 'Event was succesfully deleted'); //publish to Messenger's Controller
        }
    });
})(App.Resources);
