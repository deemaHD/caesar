'use strict';
(function (This) {
    This.ResourceItemView = This.ItemView.extend({
        tagName: 'li',
        className: 'list-group-item',
        tpl: templates.itemTpl,

        events: {
            'click .destroy': 'confirmDelete',
            'click .editSetings': 'edit',
            'dblclick': 'edit',
            'keypress .edit-type': 'updateOnEnter',
            'keydown .edit-type': 'revertOnEscape',
            'blur .edit-type': 'save',
            'input .edit-type' : 'focus'
        },

        initialize: function () {
            this.collection = collections.resouresCollection;
            Backbone.Validation.bind(this);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'change', this.render);
        },

        findRelations: function () {
            var resourceRelations = this.collection.getRelations(this.model);
            if (relations.length > 0) {
                   hashToDelete.Resources = resourceRelations; 
            }
        },

        getAllRelations: function () {
            this.findRelations();
            this.showWarning();
        }
    });
})(App.Settings);