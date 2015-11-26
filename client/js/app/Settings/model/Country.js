'use strict';

(function (This) {
    This.Country = Backbone.Model.extend({
        defaults: function () {
            return {
            	countryName: ''
            }
        },

        validation: {
        	countryName: [
        		{
                    required: true,
                    msg: 'Field cannot be empty'
                }, {
                    minLength: 4,
                    msg: 'Min length is 4 symbols'
                }, {
                    maxLength: 20,
                    msg: 'Max length is 20 symbols'
                },{
                    pattern: 'locationRegEx',
                    msg: 'Latin letters, space and dash "-"'
                }
        	]

        }
    });
})(App.Settings);