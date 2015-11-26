'use strict';
(function (This) {
	This.Router = Backbone.Router.extend({
		routes: {
			'Resources': 'showResources',
			'Resources/new': 'createResource',
			'Resources/:id/edit': 'editResource',
			'Resources*path': 'notFound'
		},

		initialize: function () {
			this.controller = new App.Resources.Controller();
            this.controller.start();

			cs.mediator.subscribe('ShowResources', this.navigateResources, null, this);
            cs.mediator.subscribe('CreateResource', this.navigateNewResource, null, this);
            cs.mediator.subscribe('EditResource', this.navigateEditResource, null, this);
            cs.mediator.subscribe('EditResourceById', this.navigateEditResourceById, null, this);
            cs.mediator.subscribe('ResourcesViewClosed', this.navigateResources, null, this);
            
            Backbone.history.loadUrl(Backbone.history.fragment);
		},

		navigateResources: function () {
            this.navigate('Resources');
        },

        navigateNewResource: function () {
            this.navigate('Resources/new');
        },

        navigateEditResource: function (event) {
            this.navigate('Resources/' + event.id + '/edit');
        },

        navigateEditResourceById: function (id) {
            this.navigate('Resources/' + id + '/edit');
        },

        showResources: function () {
            this.controller.showAll();
        },

        createResource: function () {
            this.controller.createView();
        },

        editResource: function (id) {
            this.controller.editViewById(id);
        },

        notFound: function () {
            cs.mediator.publish('Show404');
        }
	});
})(App.Resources);