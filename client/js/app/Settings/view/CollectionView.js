'use strict';
(function (This) {
    This.CollectionView = Backbone.View.extend({
        
        createNew: function (e) {
            var ENTER = 13,
                $typeValue = this.$('.new-type');

            if(e.which !== ENTER || !$typeValue.val().trim()){
                return;
            }
            this.save();
        },

        save: function () {
            var $typeValue = this.$('.new-type'),
                properValue = $typeValue.val().trim().toLowerCase(),
                attributes = {
                    name: properValue
                };

            if (!this.preValidate(attributes)) {
                this.collection.create(attributes);
                $typeValue.val('');
            }
        }
    });
})(App.Settings);