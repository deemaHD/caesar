'use strict';
(function (This) {
    This.CountryCollectionView = This.CollectionView.extend({
        tagName: 'div',
        className: 'col-md-3',
        template: templates.countryTpl,

        events: {
            'keypress .new-country': 'createNew',
            'click .addCountySettings': 'save',
            'input .new-country' : 'focus'
        },

        initialize: function () {
            this.model = new This.Country();
            Backbone.Validation.bind(this);
            this.collection = collections.countriesCollection;
            this.listenTo(this.collection, 'add', this.renderOne);
            this.listenTo(this.collection, 'destroy', this.render);
        },

        render: function () {
			this.count = 0;
            this.$el.html(this.template);
            this.collection.each(function (model) {
                this.renderOne(model);
            }, this);

            return this;
        },

        renderOne: function (model) {
            var countryView = new App.Settings.CountryItemView({model: model});
            this.$('.countries').append(countryView.render().el);
            this.$('.destroy').addClass('country');
			this.count++;
			this.showScroll();
            
			return this;
        },

        showScroll: function () {
			var docHeight = $(document).height(),
			    boxHeight = docHeight - 226 + 'px',
			    divHeight = 224 + (45 * this.count);
			
			if(divHeight >= (docHeight - 50)) {
			    this.$('#countyScroll').addClass('showScroll');
				this.$('.showScroll').css('height', boxHeight)
			} else {
				this.$('#countyScroll').removeClass('showScroll');
			}
		},

        focus: function () {
            this.$('.new-country').focus();
        },

        createNew: function (e) {
            var ENTER = 13,
                $inputCountry = this.$('.new-country');

            if(e.which !== ENTER || !$inputCountry.val().trim()){
                return;
            }
           this.save();
        },
		
		save: function () {
			var $input = this.$('.new-country'),
                properValue = firstToUpperCase($input.val().trim().toLowerCase()),
                attributes = { 
                    countryName: properValue
                }; 

            if (!this.preValidate(attributes)) {
                this.collection.create(attributes);
                $input.val('');
            }
		},

        preValidate: function (attributes) {
            var attrName,
                validationResult;

            validationResult = this.validateName(attributes.countryName) || this.model.preValidate(attributes);

            if (validationResult) {
                for (attrName in validationResult) {
                    cs.mediator.publish(  
                        'Hint',
                        validationResult[attrName],
                        this.$('.new-country')
                    );
                }
            }

            return validationResult;
        },

        validateName: function (value) {
            return validateNameField(value, collections.countriesCollection.toJSON());
        }
    });
})(App.Settings);