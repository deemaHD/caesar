'use strict';
(function (This) {
    This.CityItemView = This.ItemView.extend({
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
            this.collection = collections.citiesCollection;
            Backbone.Validation.bind(this);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'change', this.render);
        },

        findRelations: function () {
            var key,
                length,
                relationsHash = {},
                resourceRelations = collections.citiesCollection.getRelations(this.model, collections.resouresCollection),
                accountRelations = collections.citiesCollection.getRelations(this.model, collections.accountsCollection),
                eventRelations = collections.citiesCollection.getRelations(this.model, collections.eventsCollection);

            relationsHash = {
                Accounts: accountRelations,
                Events: eventRelations,
                Resources: resourceRelations
            };

            for (key in relationsHash) {
                    length = relationsHash[key].length;
                    if (length > 0) {
                        hashToDelete[key] = relationsHash[key];
                    }
            }
        },

        getAllRelations: function () {
            this.findRelations();
            this.showWarning();
        }
    });
})(App.Settings);