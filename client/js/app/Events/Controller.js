'use strict';

(function (This) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'CreateEvent': 'createView',
            'EditEvent': 'editView',
            'CreateEditViewClosed': 'viewClosed'
        },

        initialize: function () {
            this.collection = collections.eventsCollection;
            this.collectionView = new This.EventCollectionView();
            this.createEditView = This.CreateEditView;
            this.el = $('#main');
            this.mediator = cs.mediator;
        }
    });
})(App.Events);