'use strict';

(function (This) {
    This.Account = Backbone.Model.extend({
        defaults: function () {
            return {
                name: '',
                lastName: '',
                login: '',
                password: '',
                locationCity: '',
                role: '',
                avatar: ''
            }
        },

        urlRoot: '/accounts',

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
                    pattern: 'fullNameRegEx',
                    msg: 'Latin letters, space and dash "-"'
                }],
            lastName: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }, {
                    minLength: 2,
                    msg: 'Min length is 2 symbols'
                }, {
                    maxLength: 20,
                    msg: 'Max length is 20 symbols'
                },{
                    pattern: 'fullNameRegEx',
                    msg: 'Latin letters, space and dash "-"'
                }],  
            login: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }, {
                    length: 6,
                    msg: 'Length should be 6 symbols'
                }],
            password: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }, {
                    length: 8,
                    msg: 'Length should be 8 symbols'
                }],
            locationCity: [
                {
                    required: true,
                    msg: 'Select city'
                }]
        }
    });
})(App.Accounts);