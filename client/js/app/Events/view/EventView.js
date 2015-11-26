'use strict';
(function (This) {
    This.EventView = Backbone.View.extend({
        tagName: 'tr',
		className: 'shortInfo',
        tpl: templates.eventTpl,
		oneClick: undefined,
		clicks: 0,
		
		events: {
            'click .edit': 'edit',
            'dblclick': 'prevent',
            'click .dell': 'confirmDelete',
            'click .fullInfo': 'showFullInfo'
        },
		
        initialize: function () {
            this.model.on('change', function() {
                this.render();
            },this);
        },

        render: function () {
            var eventType = collections.eventTypes.get(this.model.get('type')),
                eventTypeName = eventType.get('name');
            this.$el.html(this.tpl({
                name: this.model.get('name'),
                type: eventTypeName
            }));

            return this;
        },

        edit: function () {
            cs.mediator.publish('EditEvent', this.model);
			this.fullEveClose();
			$('.toshowfirst').switchClass('col-md-8', 'col-md-12', 1000);
			$('.hidden').switchClass('', 'hidden', 1000);

        },

        confirmDelete: function () {
            var message = 'Are you sure to delete "' + this.model.get('name') + '" event?';
            cs.mediator.publish('Confirm', message, this.delete.bind(this));
			this.fullEveClose();
			$('.toshowfirst').switchClass('col-md-8', 'col-md-12', 1000);
        },

        delete: function () {
            this.model.destroy();
            this.remove();
            cs.mediator.publish('Notice', 'Event was succesfully deleted'); //publish to Messenger's Controller
			this.fullEveClose();
        },
		
		fullEveClose: function () {
			$('.toshow').addClass('hidden');
			$('.shortInfo').removeClass('warning');
		},
		
		showFullInfo: function () {
			var that = this;
			this.clicks++;  //count clicks

			if(this.clicks === 1) {
				this.oneClick = setTimeout(function() {
					var eventFullView = new App.Events.EventFullView({model: that.model});
				
					$('.fullInform').remove();
					$('.fullEvent').append(eventFullView.render().el);
					
					
					$('.shortInfo').removeClass('warning');
					that.$el.addClass('warning');
					
					if($('.toshowfirst').hasClass('col-md-12')){
						$('.toshow').switchClass('hidden', '', 1000);
					} else {
						$('.toshow').removeClass('hidden');
					}
					
					$('.toshowfirst').switchClass('col-md-12', 'col-md-8', 1000);
					that.clicks = 0;
				}, 200);
				
			} else {
				clearTimeout(this.oneClick);
				this.edit();
				this.clicks = 0;
			}
		},
		
		prevent: function (e) {
			 e.preventDefault();
		}
    });
})(App.Events);