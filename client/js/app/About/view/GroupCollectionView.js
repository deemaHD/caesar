"use strict";

(function (This) {
    This.GroupCollectionView = Backbone.View.extend({
        tagName: 'div',
        className: 'About',
		score: 0,
		gamStart: false,

        template: templates.groupCollectionTpl,
		
		events: {
			'dblclick .game': 'play',
			'dblclick .mouseAdd ': 'playClick'
		},
       
        initialize: function () {
            this.groupCollection = new This.GroupCollection(this.cleargroupList);
            this.groupCollection.fetch();
			this.groupCollection.once('sync', this.sortContributors, this);
        },

        render: function () {
            this.$el.html(this.template());

            return this;
        },

        sortContributors: function () {
            this.groupCollection.forEach(function (group) {
                var groupContributors = group.get('students');
                this.addOne(group, groupContributors);
            }, this);
        },

        addOne: function (_group, _contributors) {
            var view = new This.GroupView(_group, _contributors);
            this.$('.list-group-container').append(view.render().el);
        },

        show: function () {
            this.$el.removeClass('hidden');
        },
		
		play: function () {
			var _this = this,
			    second = 15;
				
			this.score = 1;
			this.gamStart = true;
			this.$('.gameShow').css('display', 'block');
			$('.mouseAdd').removeClass('mycoursor');
			
			$('.score').text('0');
			
			cs.mediator.publish('Play', false);
			
			tiktak();
							
			function tiktak () {
			    if(second<=9){
					second="0" + second;
				}
				
			    $('#timer').text(second);
			    
				if(second == '00'){
				    _this.gamStart = false;
				    cs.mediator.publish('Play', true);
					
				    setTimeout(function () {
						$('.gameShow').css({'display': 'none', 'color': 'black'});
						$('.animated').removeClass('zoomInDown');
						$('.mouseAdd').addClass('mycoursor');
					}, 7000);
					
					$('.gameShow').css('color', 'red');
					
					return false;
			    }
			  second--;
			  setTimeout(tiktak, 1000);
			}
			
		},
		
		playClick: function () {
            if(this.gamStart) {
				$('.score').text(this.score);
			    this.score += 1;
			}
		}
    });
})(App.About);