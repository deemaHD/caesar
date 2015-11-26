(function (This) {
    This.CreateEditView = App.BaseModalView.extend({
		className: 'modal fade in holidayScroll',
        template: templates.editHolidayTpl,

        events: {
			'click .save': 'save',
            'click .cancel': 'cancel',
            'keypress': 'updateOnEnter',
			'keydown': 'closeOnEscape',
            'keydown': 'switch',
            'blur input': 'showHints'
        },

        initialize: function () {
            this.model = this.model || new This.HolidaysModel();
            Backbone.Validation.bind(this, {invalid: this.showHints });

            $('body').on('keypress', this.updateOnEnter.bind(this));
            $('body').on('keydown', this.closeOnEscape.bind(this));
        },

        render: function () {
            var isNewModel = this.model.isNew(),
                holidayDate = this.model.get('date'),
                locationCountry = collections.countriesCollection.toJSON(),
                countryName = collections.countriesCollection.get(this.model.get('locationCountry'));
				
            this.$el.append(this.template({
                name: this.model.get('name'),
                locationCountry: locationCountry,
                country: countryName,
                date: holidayDate
            }));

            this.$('#datetimepicker').datetimepicker({
                locale: 'en',
                format: 'MM/DD/YYYY',
                minDate: isNewModel? 1 : holidayDate
            });
			
            $('body').css('overflow-y', 'hidden');
			
            this.setTabIndex();
            
            return this;
        },

        save: function () {
			var isNewModel = this.model.isNew(),
                $locationValue = this.$('#selectCountry').val()? Number(this.$('#selectCountry').val()): '',
				attributes;

            attributes = {
				name : this.$('#name').val(),
				locationCountry: $locationValue,
				date: this.$("#date").val()
			};

            this.model.save(attributes);
            if (this.model.isValid()) {    
                collections.holidaysCollection.add(this.model);
                cs.mediator.publish( //publish to Messenger's Controller
                    'Notice',
                    isNewModel ? 'You succesfully added a new holiday' : 'Information succesfully changed'
                );
                this.cancel();
				$('#hollidaysModal').modal('hide');
			}
        },
		
		cancel: function () {
            this.changeClassAndCancel('HolidaysViewClosed');
            $('body').off();
        }
    });
})(App.Holidays);
