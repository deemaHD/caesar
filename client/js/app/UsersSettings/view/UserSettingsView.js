(function (This) {
    This.UserSettingsView = App.BaseModalView.extend({
		className: 'modal fade in eventsScroll',
        template: templates.userSettingsTpl,
        
        events: {
            'click #save': 'save',
			'click .cancel': 'cancel',
            'click .generate-pass': 'generatePassword',
			'keydown': 'closeOnEscape',
			'keypress': 'updateOnEnter',
            'change .user-avatar': 'getUserAvatar',
            'keydown': 'switch'
        },
        
        initialize: function () {
            this.model = new App.Accounts.Account(User.get());
			cs.mediator.subscribe('ReturnRout', this.returnRoute, null, this);
            
            $('body').on('keypress', this.updateOnEnter.bind(this));
			$('body').on('keydown', this.closeOnEscape.bind(this));
        },
        
        render: function () {
            this.$el.append(this.template({
                name: this.model.get('name'),
                lastName: this.model.get('lastName'),
                login: this.model.get('login'),
                password: this.model.get('password'),
                avatar: this.model.get('avatar')
            }));

            $('body').css('overflow-y', 'hidden');
			this.setTabIndex();
            
            return this;
        },
        
        save: function () {
            var newModel = this.setAttributes();
			if(this.validation()) {
				this.model.save(newModel, {
					success: function() {
						cs.mediator.publish( 'Notice', 'You succesfully change account');
					},
					wait: true
				});

				this.cancel();
				User.update();
			}
        },
		
		validation: function () {
			var newModelPassword = this.setAttributes().password,
			    regExp = /^(?=(.*[^A-Za-z0-9]){2,})(?=(.*[A-Z]){2,})(?=(.*\d){2,})(?=(.*[a-z]){2,}).+/,
				found = newModelPassword.match(regExp);
			    options = {},
				valid = true;
				
				$('#psswordWrong').tooltip('destroy');
				
			if (newModelPassword.length === 0) {
				options.title = 'Field cannot be empty';
				tooltip();
			} else if (newModelPassword.length > 8) {
                options.title = 'Max length is 8 symbols';
				tooltip();
			} else if (found == undefined) {
                options.title = 'Wrong password';
				tooltip();
			} 
			
			function tooltip () {
				$('#psswordWrong').tooltip(options).tooltip('toggle');
				valid = false;
			}
			
			return valid;

		},
        
        setAttributes: function () {
            var attributes = {},
                $inputs;
                
            $inputs = this.$('.accountForm :input');

            $inputs.each(function() {
                if (this.name) {
                    attributes[this.name] = $(this).val();
                }
            });

            return attributes;
        },

        getUserAvatar: function (evt) {
            var that = this,
                reader,
                file;

            reader = new FileReader();
            file = evt.target.files;

            reader.onload = function () {
                that.model.set({avatar: reader.result});
                that.$('.preview').attr('src', reader.result);
                User.set('avatar', reader.result);
                that.model.set({'avatar': reader.result});
            };
            reader.readAsDataURL(file[0]);
        },
        
        show: function () {
            this.$el.removeClass('hidden');
            $('body').on('keydown', this.closeOnEscape.bind(this));
            $('body').on('keypress', this.updateOnEnter.bind(this));
        },
        
        generatePassword: function () {
            var generatedPassword = Generator.getPass();
            $('.password-input').val(generatedPassword);
        },
		
		returnRoute: function (route) {
            this.mainroute = '/' + route;
        },
		
		cancel: function () {
            this.$el.addClass('hidden');
			cs.mediator.publish('MenuClicked', this.mainroute);
			$('.menu-item').removeClass('active');
			$('body').css('overflow-y', 'auto');
            
            cs.mediator.remove('ReturnRout');
            $('body').off();
        }
    });
})(App.UserSetting);
