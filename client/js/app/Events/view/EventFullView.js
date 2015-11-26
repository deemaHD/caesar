'use strict';
(function (This) {
    This.EventFullView = Backbone.View.extend({
        tagName: 'tbody',
		className: 'fullInform',
        tpl: templates.eventFullTpl,
		
        initialize: function () {
			 this.resourceCollection = collections.resouresCollection;
			
            this.model.on('change', function() {
                this.render();
				
            },this);
        },

        render: function () {
			var eventType = collections.eventTypes.get(this.model.get('type')),
			    resources = this.model.get('resources'),
                eventTypeName = eventType.get('name'),
				res = "";
			
	        _.each(resources, function (num) {
				this.resourceCollection.each(function (event) {
	                if(num === event.get('id')) {
						var date = '';

						if(event.get('type') === "0") {
							date =  ': ' + '<br>' + event.get('dateStart') + " - " +  event.get('dateFinish');
						}
						res += '<tr><td>' + event.get('name') + date + '</td></tr>';
						date = '';
					}
                });  
			}, this);			
			
            this.$el.html(this.tpl({
                name: this.model.get('name'),
                type: eventTypeName,
				resourc: res
            }));
			$('.shortInfo').removeClass('warning');
			$('.toshow').addClass('hidden');
			
            return this;
        }


    });
})(App.Events);