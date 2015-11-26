'use strict';

(function (This) {
    This.Event = Backbone.Model.extend({
        defaults: function () {
            return {
                name: '',
                type: '',
                locationCity: '',
                resources: []
            }
        },

        urlRoot: '/events',

        validation: {
            name: [
                {
                    maxLength: 35,
                    msg: 'Max length is 35 symbols'
                },
                {
                    minLength: 2,
                    msg: 'Min length is 2 symbols'
                },
                {
                    required: true,
                    msg: 'Field cannot be empty'
                },
                {
                    pattern: 'eventNameRegEx',
                    msg: 'Latin alphabet only. Allowed symbols: ,.-/+'
                }
            ],
            type: [
                {
                    required: true,
                    msg: 'Select type'
                }
            ]
        }
    });
})(App.Events);