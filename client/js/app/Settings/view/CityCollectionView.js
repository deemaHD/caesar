'use strict';
(function (This) {
    This.CityCollectionView = This.CollectionView.extend({
        tagName: 'div',
        className: 'col-md-3',
        template: templates.cityTpl,

        events: {
            'keypress .new-city': 'createNew',
            'click .addSettings': 'save',
            'input .new-city' : 'focus'
        },

        initialize: function () {
            this.model = new This.City();
            Backbone.Validation.bind(this);
            this.collection = collections.citiesCollection;
            this.listenTo(this.collection, 'add', this.renderOne);
            this.listenTo(this.collection, 'destroy', this.render);
            this.listenTo(collections.countriesCollection, 'all', this.render); 
            this.count = 0;
        },

        render: function () {
            this.count = 0;
            this.$el.html(this.template({
                locationCountry: collections.countriesCollection.toJSON()
            }));
            this.collection.each(function (model) {
                this.renderOne(model);
            }, this);

            return this;
        },

        renderOne: function (model) {
            var cityView = new App.Settings.CityItemView({model: model});
            this.$('.cities').append(cityView.render().el);
            this.count++;
            this.showScroll();
            return this;
        },

        showScroll: function () {
            var docHeight = $(document).height(),
                boxHeight = docHeight - 250 + 'px',
                currentBoxHeight = 224 + (45 * this.count);

            if(currentBoxHeight >= (docHeight - 50)) {
                this.$('#citiesScroll').addClass('showScroll');
                this.$('.showScroll').css('height', boxHeight)
            } else {
                this.$('#citiesScroll').removeClass('showScroll');
            }
        },

        createNew: function (e) {
            var ENTER = 13,
                $inputCity = this.$('.new-city');
                
            if (e.which !== ENTER || !$inputCity.val().trim()) {
                return;
            }
            this.save();
        },

        focus: function () {
            this.$('.new-city').focus();
        },

        save: function () {
            var $inputCity = this.$('.new-city'),
                properValue = firstToUpperCase($inputCity.val().trim().toLowerCase()),
                attributes = {
                    name: properValue,
                    location: Number(this.$('#selectCountry').val())
                };

            if (!this.preValidate(attributes)) {
                this.collection.create(attributes);
                $inputCity.val('');
            }
        },

        preValidate: function (attributes) {
            var attrName,
                validationResult;

            validationResult = this.validateName(attributes.name) || this.model.preValidate(attributes);

            if (validationResult) {
                for (attrName in validationResult) {
                    cs.mediator.publish(  
                        'Hint',
                        validationResult[attrName],
                        this.$('.new-city')
                    );
                }
            }

            return validationResult;
        },

        validateName: function (value) {
            return validateNameField(value, collections.citiesCollection.toJSON());
        }
    });
})(App.Settings);