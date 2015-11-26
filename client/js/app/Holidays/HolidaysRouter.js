'use strict';
(function (This) {
	This.Router = Backbone.Router.extend({
		routes: {
			'Holidays': 'showHolidays',
			'Holidays/new': 'createHoliday',
			'Holidays/:id/edit': 'editHoliday',
			'Holidays*path': 'notFound'
		},

		initialize: function () {
			this.controller = new App.Holidays.Controller();
            this.controller.start();

			cs.mediator.subscribe('ShowHolidays', this.navigateHolidays, null, this);
            cs.mediator.subscribe('CreateHoliday', this.navigateNewHoliday, null, this);
            cs.mediator.subscribe('EditHoliday', this.navigateEditHoliday, null, this);
            cs.mediator.subscribe('EditHolidayById', this.navigateEditHolidayById, null, this);
            cs.mediator.subscribe('HolidaysViewClosed', this.navigateHolidays, null, this);
            
            Backbone.history.loadUrl(Backbone.history.fragment);
		},

		navigateHolidays: function () {
            this.navigate('Holidays');
        },

        navigateNewHoliday: function () {
            this.navigate('Holidays/new');
        },

        navigateEditHoliday: function (event) {
            this.navigate('Holidays/' + event.id + '/edit');
        },

        navigateEditHolidayById: function (id) {
            this.navigate('Holidays/' + id + '/edit');
        },

        showHolidays: function () {
            this.controller.showAll();
        },

        createHoliday: function () {
            this.controller.createView();
        },

        editHoliday: function (id) {
            this.controller.editViewById(id);
        },

        notFound: function () {
            cs.mediator.publish('Show404');
        }
	});
})(App.Holidays);