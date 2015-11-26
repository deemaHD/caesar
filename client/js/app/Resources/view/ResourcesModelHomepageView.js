(function (This) {
    This.ResourcesModelHomepageView = Backbone.View.extend({
        tagName: 'tr',
    
        template: templates.resourcesModelHomepageTpl,
    
        events: {
            'click .glyphicon-edit': 'openEdit',
            'dblclick': 'openEdit',
            'click .glyphicon-trash': 'confirmDelete'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render); 
        },

        render: function () {
            var resourceType = collections.resourceTypes.get(this.model.get('type')),
                resourceTypeName = resourceType.get('name');
            this.$el.html(this.template({
                name: this.model.get('name'),
                type: resourceTypeName,
                useInSchedule: this.model.get('useInSchedule')
            }));
            return this;
        },
    
        openEdit: function () {
            cs.mediator.publish('EditResource', this.model);
        },

        confirmDelete: function () {
            var message = 'Are you sure to delete "' + this.model.get('name') + '" resource?',
                filtered = collections.eventsCollection.filterByResource(this.model.get('id'));

            if(!filtered.length){
                cs.mediator.publish('Confirm', message, this.delete.bind(this));   //publish to Messenger controller
            } else {
                cs.mediator.publish('ShowResourceUsage', this.model);   //publish to Events controller
            }

        },
        
        delete: function () {
            this.model.destroy();
            this.remove();
            cs.mediator.publish('Notice', 'Resource was succesfully deleted'); //publish to Messenger's Controller
        }
    });
})(App.Resources);
