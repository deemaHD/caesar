(function (This) {
	This.PreView = Backbone.View.extend ({
		className: 'modal fade in preViewScroll',
		template: templates.preViewScheduleTpl,
 		
		events: {
			'click .save': 'save',
			'click .cancel': 'cancel',
			'keydown': 'closeOnEscape',
            'keypress': 'updateOnEnter'
		},
		
		initialize: function () {
			$('body').one('keydown', this.closeOnEscape.bind(this));
            $('body').one('keypress', this.updateOnEnter.bind(this));
		},
		
		render: function () {
		    this.$el.append(this.template);
            
            cs.subRouters['SchedulePreview'] = new App.SchedulePreview.Router();
			
            $('body').css('overflow-y', 'hidden');
			
			return this;
		},
		
		save: function () {
			$('<form action="/download" method="get"><input type="hiden" name="location" value="' + User.get().locationCity + '"></form>')
            .appendTo('body').submit().remove();
                        
			this.cancel()
		},
		
		cancel: function () {
            var _this = this;			
			$('.myAnimateClass').removeClass('slideInDown').addClass('fadeOutUp');
			setTimeout(function() {
				$('body').css('overflow-y', 'auto');
				_this.el.remove();
		    	cs.mediator.publish('PreViewClose');
			}, 400);
            $('body').off();
        },
		
		closeOnEscape: function (e) {
            if (e.keyCode === ESC) {
                this.cancel();
            }
        },
		
		updateOnEnter: function (e) {
            if (e.keyCode === ENTER) {
               this.save();
            }
        }
	})
})(App.Schedule);