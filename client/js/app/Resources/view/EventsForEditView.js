(function (This) {
    This.EventsForEditView = App.BaseView.extend({
        className: 'modal fade in',
        tpl: templates.eventsForEditTpl,
        itemViews: [],

        events: {
            'click .cancel': 'cancel',
            'click .delete': 'delete'
        },

        initialize: function (options) {
            this.resourceModel = options.model;
            this.collection = collections.eventsCollection.filterByResource(this.resourceModel.get('id'));
            this.pageSize = 10;
            this.pageIndex = 0;
            this.listenTo(collections.eventsCollection, 'destroy', this.show);
            $('body').on('keydown', this.closeOnEscape.bind(this));
        },

        render: function () {
            this.$el.append(this.tpl({name: this.resourceModel.get('name')}));
            this.renderGrid();
            return this;
        },

        renderOne: function (model) {
            var itemView = new This.EventItemView({model: model});
            this.$('.event-list').append(itemView.render().$el);
            this.itemViews.push(itemView);
        },

        show: function () {
            this.collection = collections.eventsCollection.filterByResource(this.resourceModel.get('id'));
            if(this.collection.length){
                this.renderGrid();
                this.$el.removeClass('hidden');
            } else {
                this.resourceModel.destroy();
                cs.mediator.publish('Notice', 'Event was succesfully deleted'); //publish to Messenger's Controller
                this.cancel();
            }
        },

        cancel: function () {
            cs.mediator.publish('EventsForEditViewClosed'); //publish to Controller
            $('body').off();
        },

        closeOnEscape: function (e) {
            if (e.keyCode === ESC) {
                this.cancel();
            }
        },

        delete: function () {
            var resourceId =  this.resourceModel.get('id');
            this.collection.each(function (event) {
                var resourcesInEvent = event.get('resources');

                resourcesInEvent = _.without(resourcesInEvent,  resourceId);
                event.save({resources: resourcesInEvent});
            });
            this.model.destroy();
            this.remove();
            cs.mediator.publish('Notice', 'Resource was succesfully deleted'); //publish to Messenger's Controller
        }
    });
})(App.Resources);
