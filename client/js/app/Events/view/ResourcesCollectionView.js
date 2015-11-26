'use strict';
(function (This) {
    This.ResourcesCollectionView = App.BaseView.extend({
        tagName: 'div',
        tpl: templates.resourseCollectionTpl,
        itemViews: [],

        events: {
            'click .pageEl': 'changePage',
            'click .typeFilter': 'filterHandler'
        },

        initialize: function (options) {
            this.collection = collections.resouresCollection.clone();
            this.eventModel = options.model;
            this.usedResources = _.clone(this.eventModel.get('resources')); // array of id resources in current event
            cs.mediator.subscribe('resourceAddedToEvent', this.addToUsed, null,  this);
            this.pageSize = 5;
            this.pageIndex = 0;
        },

        render: function () {
            this.collection = this.getFilteredCollection();

            this.$el.empty().append(this.tpl({
                types: collections.resourceTypes.toJSON()
            }));

            this.renderGrid();

            return this;
        },

        renderOne: function (resource) {
            var modelView = new App.Events.ResourceView({model: resource});

            this.$('.list-group').append(modelView.render().el);
            this.itemViews.push(modelView);

        },

        //method for rendering free resources after one was removed from left field
        renderRemoved: function (id) {
            this.usedResources =  _.without(this.usedResources, id); // remove id from array of used resources
            this.collection = this.getFilteredCollection();
            this.renderGrid();
        },

        //filtering collection without used resources in current event.
        // optional: filtering by resource type(typeFilter)
        getFilteredCollection: function (typeFilter) {
            var that = this,
                collection,
                filtered;

            filtered = collections.resouresCollection.filter(function (model) {
                return that.usedResources.indexOf(model.get('id')) === -1;
            });
            collection = new App.Resources.ResourcesCollection(filtered); // new collection with only free resources
            if (typeFilter) {
                collection = collection.filterByType(typeFilter);
            }

            return collection;
        },

        addToUsed: function (model) {
            this.usedResources.push(model.get('id'));
            this.collection = this.getFilteredCollection();
            this.renderGrid();
        },

        filterHandler: function (e) {
            var filter = e.target.getAttribute('filter');

            if (filter === 'all') {
                this.collection = this.getFilteredCollection();
            } else {
                this.collection = this.getFilteredCollection(filter);
            }

            this.pageIndex = 0;
            this.renderGrid();
        }
    });
})(App.Events);