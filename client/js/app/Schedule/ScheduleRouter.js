(function (This) {
	This.Router = Backbone.Router.extend({
		routes: {
			'Schedule': 'showSchedule',
			'Schedule/Preview*path': 'showPreView',
			'Schedule*path': 'notFound'
		},

		initialize: function () {
			var controller = new This.Controller();
			cs.mediator.subscribe('ShowPreView', this.navigateShowPreView, null, this);
			cs.mediator.subscribe('PreViewClose', this.navigateClosePreView, null, this);
			Backbone.history.loadUrl(Backbone.history.fragment);
		},
		
		navigateClosePreView: function () {
            this.navigate('Schedule');
        },
		
		navigateShowPreView: function () {
            this.navigate('Schedule/Preview');
        },

		showSchedule: function () {
			cs.mediator.publish('ScheduleSelected');
		},
		
		showPreView: function () {
			cs.mediator.publish('ShowPreView');
		},

        notFound: function () {
			cs.mediator.publish('Show404');
        }		
	})
})(App.Schedule);