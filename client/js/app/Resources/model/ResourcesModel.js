(function (This) {
    This.ResourcesModel = Backbone.Model.extend({
        defaults: function () {
            return {
                'type': '',
                'name': '',
                'locationCity': '',
				'dateStart': '01/01/2015',
				'dateFinish': '01/02/2095',
                'useInSchedule': true
            }
        },

        urlRoot: '/resources',

        validation: {
            name: [
                {
                    maxLength: 20,
                    msg: 'Max length is 20 symbols'
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
                    pattern: 'resourceNameRegEx',
                    msg: 'Latin alphabet only. Allowed symbols: .-/'
                }
            ],
            type: [
                {
                    required: true,
                    msg: 'Select type'
                }
            ],
			dateStart: [
                {
                    required: true,
                    msg: 'Field cannot be empty'
                }
            ],
            dateFinish: function (value) {
                if (value !== '') { 
                    var msg = '',
                        dateFinish = toDateObj(value),
                        dateStart = toDateObj($('#dateStart').val());            
                    if (dateStart >= dateFinish) {
                        msg = '\'Start date\' should be earlier than \'End date\'';
                        return msg;
                    }
                } else {
                      msg = 'Field cannot be empty';
                      return msg;
                }
            }
        }
    });
})(App.Resources);