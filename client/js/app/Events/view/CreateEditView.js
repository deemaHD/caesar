(function (This) {
    This.CreateEditView = App.BaseModalView.extend({
		className: 'modal fade in eventsScroll',
        template: templates.editEventTpl,
        resourceItemTpl: templates.resourceItemTpl,

        events: {
            'click .save': 'save',
            'click .cancel': 'cancel',
            'click .resource': 'removeResource',
            'keydown': 'closeOnEscape',
            'keydown': 'switch',
            'keypress': 'updateOnEnter',
            'change .editName': 'setName',
            'click .returnName': 'returnName',
            'blur input': 'showHints'
        },

        initialize: function () {
            this.model = this.model || new This.Event();
            this.resourceCollection = collections.resouresCollection;
            this.resourceSorting();            
            this.resourcesCollectionView = new App.Events.ResourcesCollectionView({ model: this.model });
            this.nameGenerator = new App.EventNameGenerator(this);

            Backbone.Validation.bind(this, {invalid: this.showHints});
            cs.mediator.subscribe('resourceAddedToEvent', this.addResourceIdToEvent, null, this);
            cs.mediator.subscribe('resourceAddedToEvent', this.nameGenerator.generateEventName, null, this);

            $('body').on('keypress', this.updateOnEnter.bind(this));
            $('body').on('keydown', this.closeOnEscape.bind(this));
        },

        render: function () {
            var eventTypes = collections.eventTypes.toJSON();
            this.$el.append(this.template({
                name: this.model.get('name'),
                typeId: this.model.get('type'),
                eventTypes: eventTypes,
                resourcesList: this.getResourcesInEvent()
            }));
            this.$('.resources-list').append(this.resourcesCollectionView.render().el);
            $('body').css('overflow-y', 'hidden');
			
            this.setTabIndex();
            this.nameGenerator.setUpPreviousName();
            
            return this;
        },

        //get array of resources models in current event by their id
        getResourcesInEvent: function () {
            var resources = this.model.get('resources'), // array of id resources in event
                filtered;

            filtered = this.resourceCollection.filter(function (model) {
                return resources.indexOf(model.get('id')) !== -1;
            });
            
            return filtered;
        },

        addResourceIdToEvent: function (resourceModel) {
            this.$('.resource-field').append(this.resourceItemTpl(resourceModel.toJSON()));
        },

        save: function () {
			var $typeValue = this.$('.type').val()? Number(this.$('.type').val()): '',
                $nameValue = this.$('.name').val().trim(), 
                isNewModel = this.model.isNew(),
                user = User.get(),
                attributes;

                attributes = {
                    name: $nameValue,
                    type: $typeValue,
					locationCity: user.locationCity,
                    resources: getIdResourcesArray()
                };

            this.model.save(attributes);
            if (this.model.isValid()) {
                collections.eventsCollection.add(this.model);
				
                cs.mediator.publish( //publish to Messenger's Controller
                    'Notice',
                    isNewModel? 'You succesfully added a new event': 'Information succesfully changed'
                );
				$('.shortInfo').removeClass('warning');
			    $('.toshow').addClass('hidden');
				$('.toshowfirst').switchClass('col-md-8', 'col-md-12', 1000);
	
				this.changeClassAndCancel('CreateEditViewClosed');
            }
            // return array of resources ID in current event
            function getIdResourcesArray () {
                var idArray = [];
                $('.resource-field  li').each(function (i, el) {
                    idArray.push(parseInt(el.getAttribute('idValue')));
                });
                return idArray;
            }
        },

		cancel: function () {
            if (this.model.isNew()){
                this.model.destroy();
            }
			cs.mediator.remove('resourceAddedToEvent');
			this.changeClassAndCancel('CreateEditViewClosed');
        },
        
        removeResource: function (e) {
            var resource = e.target;
            this.nameGenerator.removeEventName(resource.getAttribute('idValue'));
            this.resourcesCollectionView.renderRemoved(parseInt(resource.getAttribute('idValue')));
            resource.remove();
            this.resourceSorting();
        },

        resourceSorting: function () {
            this.resourceCollection.comparator = function(resource) {
                return resource.get('type');
            };
            this.resourceCollection.sort();
        },
        
        remove: function () {
            this.resourcesCollectionView.remove();
            Backbone.View.prototype.remove.call(this, arguments);
        },
        
        setName: function () {
            this.nameGenerator.setName();
        },
        
        returnName: function () {
            this.nameGenerator.returnName();
        }
    });
})(App.Events);