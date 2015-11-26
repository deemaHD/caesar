'use strict';
(function (This) {
    This.CountryItemView = This.ItemView.extend({
        tagName: 'li',
        className: 'list-group-item',
        tpl: templates.itemTpl,

        events:{
            'click .destroy': 'confirmDelete',
            'click .editSetings': 'edit',             // in ItemView
            'dblclick': 'edit',                       // in ItemView
            'keypress .edit-type':	'updateOnEnter',  // in ItemView
            'keydown .edit-type': 'revertOnEscape',   // in ItemView
            'blur .edit-type': 'save'
        },

        initialize: function () {
            this.collection = collections.countriesCollection;
            Backbone.Validation.bind(this);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.tpl({
                name: this.model.get('countryName')
            }));

            return this;
        },

        save: function () {
            var value = firstToUpperCase(this.$('.edit-type').val().trim().toLowerCase()),
                attributes = {
                    countryName: value
                };
            this.saveChangedAttr(attributes);
        },

        findRelations: function () {
            var key,
                length,
                relationsHash = {},
                citiesId = collections.citiesCollection.getCitiesId(this.model),
                accountRelations = this.collection.getRelationsViaCities(collections.accountsCollection, citiesId),
                eventRelations = this.collection.getRelationsViaCities(collections.eventsCollection, citiesId),
                resourceRelations = this.collection.getRelationsViaCities(collections.resouresCollection, citiesId),
                holidayRelations = this.collection.getRelationsWithHolidays(this.model),
                cityRelations = this.collection.getRelationsWithCities(this.model);

                relationsHash = {
                    Accounts: accountRelations,
                    Events: eventRelations,
                    Resources: resourceRelations,
                    Holidays: holidayRelations,
                    Cities: cityRelations
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