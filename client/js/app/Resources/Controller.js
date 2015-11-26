(function (This) {
    This.Controller = Backbone.Controller.extend({
        subscribes: {
            'CreateResource': 'createView',                         //published from CollectionView
            'EditResource': 'editView',                             //published from ResourcesModeView
            'ResourcesViewClosed': 'viewClosed',                    //published from CreateEditView
            'ShowResourceUsage': 'ShowResourceUsage',               //from ResourceModelHomepageiew
            'EventsForEditViewClosed': 'EventsForEditViewClose',    //from ResourcesModelHomepageView
            'EditEventClicked': 'showEditEvent',                    //from EventItemView
            'EventViewClosed': 'closeEditEventView' //from This.EditEventView
        },

        initialize: function () {
            this.collection = collections.resouresCollection;
            this.collectionView = new This.CollectionView();
            this.createEditView = This.CreateEditView;
            this.el = $('#main');
            this.mediator = cs.mediator;
        },

        //method for rendering list of events, with resource that user wont to delete
        ShowResourceUsage: function (resourceModelForDelete) {
            this.EventsForEditView = new App.Resources.EventsForEditView({model: resourceModelForDelete});
            this.el.append(this.EventsForEditView.render().$el);
        },

        EventsForEditViewClose: function () {
            this.EventsForEditView && this.EventsForEditView.remove();
        },

        showEditEvent: function (event) {
            this.editEventView = new This.EditEventView({model: event});
            this.EventsForEditView.$el.addClass('hidden');
            this.el.append(this.editEventView.render().$el);
        },

        closeEditEventView: function () {
            this.editEventView.remove();
            this.EventsForEditView.show();
        }
    });
})(App.Resources);