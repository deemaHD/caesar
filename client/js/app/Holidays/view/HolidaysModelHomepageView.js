(function (This) {
    This.HolidaysModelHomepageView = Backbone.View.extend({
        tagName: 'tr',
    
        template: templates.holidaysModelHomepageTpl,
    
        events: {
            'click .glyphicon-edit': 'openEdit',
            'dblclick': 'openEdit',
            'click .glyphicon-trash': 'confirmDelete',
            'click .isActive': 'isActive',
            'mouseover .showHollidaysDisableCity': 'showTooltip',
            'mouseout .showHollidaysDisableCity': 'hideTooltip'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.user = User.get();			
        },
    
        openEdit: function () {
            cs.mediator.publish('EditHoliday', this.model);
        },
        
        confirmDelete: function () {
            var message = 'Are you sure to delete ' + this.model.get('name') + ' holiday?';
            cs.mediator.publish('Confirm', message, this.delete.bind(this));
        },

        delete: function () {
            this.model.destroy();
            this.remove();
            cs.mediator.publish('Notice', 'Holiday was succesfully deleted'); //publish to Messenger's Controller
        },
		
		isActive: function () {
			var skip = this.model.skipped(),
                location = User.get();
			
			var isActiveClass = this.model.get('isActive');

			if(!skip.skip) {
				isActiveClass.splice(skip.elNumber, 1);
				this.$el.removeClass("warning");
				this.$('.isActive').removeClass('glyphicon-thumbs-down').addClass('glyphicon-thumbs-up');
			} else {
				isActiveClass.push(location.locationCity);
				this.model.set('isActive', isActiveClass);
				this.$el.addClass("warning");
				this.$('.isActive').removeClass('glyphicon-thumbs-up').addClass('glyphicon-thumbs-down');
			}
			
			this.model.save(); 
		},
    
        render: function () {
            var locationCountry = collections.countriesCollection.get(this.model.get('locationCountry')),
			    citiesCollection = collections.citiesCollection,
                countryName = locationCountry.get('countryName'),
				roleAdmina = localStorage.getItem("manRole"),
				skip = this.model.skipped();

            this.$el.html(this.template({
                name: this.model.get('name'),
                locationCountry: countryName,
                date: this.model.get('date'),
				role: this.user.role,
				city: this.model.get('isActive'),
				locationCities: citiesCollection
            }));
			
			if(roleAdmina === 'admin') {
			    if(this.model.get('isActive').length > 0) {
					this.$('.isActive').removeClass('glyphicon-thumbs-up').addClass('glyphicon-thumbs-down');
				    this.$el.addClass("warning");
				}
			} else if (!skip.skip) {
				this.$('.isActive').removeClass('glyphicon-thumbs-up').addClass('glyphicon-thumbs-down');
				this.$el.addClass("warning");
			}
			
            return this;
        },
		
		showTooltip: function () {
			var manrole = localStorage.getItem("manRole");
			if(manrole === 'admin'){
				this.$('.holidayTooltip').addClass('displayH');
			}
			
		},
		
		hideTooltip: function () {
			this.$('.holidayTooltip').removeClass('displayH');
		}
    });
})(App.Holidays);
