'use strict';
(function (This) {
    This.AuthenticationView = This.ConfirmView.extend({
        className: 'modal fade in hidden',
        template: templates.authenticationTpl,

        events: {
            'click .send': 'sendData',
            'click .cancel': 'close'
        },

        set: function (message, callback, errorMsg) {
            this.message = message;
            this.callback = callback;
            this.errorMsg = errorMsg;
        },

        render: function () {
            this.$el.html(this.template({
            	message: this.message,
            	errorMsg: this.errorMsg
            	}))
                .removeClass('hidden');

            return this;
        },

        sendData: function () {
        	var authData = {},
        		$login = this.$('#InputLogin').val().trim(),
                $password = this.$('#InputPassword').val().trim();

            if ($login === '' || $password  === '') {
            	this.errorMsg = 'The fields cannot be empty. Please enter authentication data';
            	this.render();
            } else {
            	authData = {
                	login: $login,
                	password: $password
            	};

        		this.callback(authData);
            	this.remove();
            }
        }

    });
})(App.Messenger);