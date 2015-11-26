'use strict';
(function (This) {
    This.MenuView = Backbone.View.extend({
        tagName: 'div',
        className: 'col-sm-10 col-sm-offset-1',
        tpl: templates.menuTpl,
		role: 'coordinator',

        events: {
            'click .resources': 'showResources',
            'click .events': 'showEvents',
            'click .schedule': 'showSchedule',
            'click .settings': 'showSettings',
            'click .contributors': 'showContributors',
            'click .holidays': 'showHolidays',
            'click .accounts': 'showAccounts',
			'click .myChek': 'changeRole',
            'click .userSetting': 'showUserSetting'
        },
		
		initialize: function () {
			var urlR = /[a-zA-Z]+/,
			    content = window.location.pathname;
				
			this.url = content.match(urlR) || ['Events'];
		},

        render: function () {
            var manRole = localStorage.getItem("manRole");
			User.set(manRole);

			var user = User.get();
	        this.role = manRole;
			
            this.$el.html(this.tpl({name : user}));
			
			if(manRole === 'admin') {
				var url = '.' + this.url[0].toLowerCase();
	            this.styleChange('Admin', 'none', 'block', '.menu-item', url);
                this.$('.changeRole').addClass('active');
			}
			this.logoHome();

            return this;
        },

        showResources: function () {
            cs.mediator.publish('MenuClicked', '/Resources'); //publish to global router
            this.$('.menu-item').removeClass('active');
            this.$('.resources').addClass('active');
        },

        showEvents: function () {
            cs.mediator.publish('MenuClicked', '/Events'); //publish to global router
            this.$('.menu-item').removeClass('active');
            this.$('.events').addClass('active');
        },

        showSchedule: function () {
            cs.mediator.publish('MenuClicked', '/Schedule'); //publish to global router
            this.$('.menu-item').removeClass('active');
            this.$('.schedule').addClass('active');
        },

         showSettings: function () {
            cs.mediator.publish('MenuClicked', '/Settings'); //publish to global router
            this.$('.menu-item').removeClass('active');
            this.$('.settings').addClass('active');
        },       

        showContributors: function () {
            cs.mediator.publish('MenuClicked', '/About'); //publish to global router
            this.$('.menu-item').removeClass('active');
            this.$('.contributors').addClass('active');
            //this.$('.about').addClass('active');
        },

        showAccounts: function () {
            cs.mediator.publish('MenuClicked', '/Accounts'); //publish to global router
            this.$('.menu-item').removeClass('active');
            this.$('.accounts').addClass('active');
        },

        showHolidays: function () {
            cs.mediator.publish('MenuClicked', '/Holidays'); //publish to global router
			cs.mediator.publish('RenderHollidays'); //publish to holidaysCollection	
            this.$('.menu-item').removeClass('active');
            this.$('.holidays').addClass('active');
        },
		
        showUserSetting: function () {
			var route = Backbone.history.fragment;
            cs.mediator.publish('MenuClicked', '/UserSetting');
			cs.mediator.publish('ReturnRout', route);
            this.$('.menu-item').removeClass('active');
            this.$('.userSetting').addClass('active');
        },
        
		changeRole: function () {
			var role = User.role();	
            		
			if(role === 'admin') {
				User.set('coordinator');
				this.role = 'coordinator';
				localStorage.setItem("manRole", this.role);
				localStorage.setItem("countryFilter", 'all');
                this.styleChange('Coordinator', 'block', 'none', '.menu-item', '.events');				
			    this.$('.changeRole').removeClass('active'); 
			    cs.mediator.publish('MenuClicked', '/Events'); //publish to global router
				$('.countryFilter').removeClass('active');
				$('.hollidayall').addClass('active');
			    
			} else {
				User.set('admin'); 
				this.role = 'admin';
				localStorage.setItem("manRole", this.role);
				this.styleChange('Admin', 'none', 'block', '.menu-item', '.settings');
                this.$('.changeRole').addClass('active');
			    cs.mediator.publish('MenuClicked', '/Settings'); //publish to global router
			}
		},
		
		styleChange: function(role, allSee, adminSee, remCl, adCl) {
			this.$('.changeRole').removeClass('active');
			this.$('#role').text(role);
			this.$('.forAdmin').css('display', allSee);
			this.$('.onlyAdmin').css('display', adminSee);
			this.$(remCl).removeClass('active');
            this.$(adCl).addClass('active');			
				
		},
		
		logoHome: function () {
			$('#logo').click(function () {	 
				$('#logo').addClass('flip');
				cs.mediator.publish('MenuClicked', '/Events'); //publish to global router
				cs.mediator.publish('RenderHollidays'); //publish to holidaysCollection		
				$('.menu-item').removeClass('active');
				$('.events').addClass('active');
				$('.forAdmin').css('display', 'block');
				$('.onlyAdmin').css('display', 'none');
				$('#role').text('Coordinator');
				$('.countryFilter').removeClass('active');
				$('.hollidayall').addClass('active');
				User.set('coordinator');
				localStorage.setItem("manRole", 'coordinator');
				localStorage.setItem("countryFilter", 'all');
				
				setTimeout(function () {
					$('#logo').removeClass('flip');
				} ,1100)
			});
		}
    }); 
})(App.Menu);