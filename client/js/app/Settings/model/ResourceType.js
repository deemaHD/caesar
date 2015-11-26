'use strict';
(function (This) {
    This.ResourceType = Backbone.Model.extend({
        defaults: function () {
            return {
            	name: ''
            }
        },
        urlRoot: '/resourceTypes',

        validation: {
        	name: [
        		{
                    required: true,
                    msg: 'Field cannot be empty'
                }, {
                    minLength: 3,
                    msg: 'Min length is 3 symbols'
                }, {
                    maxLength: 20,
                    msg: 'Max length is 20 symbols'
                },{
                    pattern: 'lettersNumbersRegEx',
                    msg: 'Latin letters, numbers, space and dash "-"'
                }
        	]
        }
    });
})(App.Settings);