(function (This) {
    This.HolidaysModel = Backbone.Model.extend({
        defaults: function () {
            return {
                name: '',
                locationCountry: '',
                date: '',
				isActive: []
            }
        },

        urlRoot: '/holidays',
        
		skipped: function () {
			var location = User.get(),
			    isActiveArr = this.get('isActive'),
				skip = true,
				elNumber;
				
				_.each(isActiveArr, function (num , i) {
				    if(location.locationCity === num) {
						elNumber = i;
				        skip = false;	   
				    }
				});
				
				return {
					skip: skip, 
					elNumber: elNumber
				}
		},
		
		skippedByLocation: function () {
			var country = this.get('locationCountry'),
			    location = User.get(),
			    skip = true;
				
			function findCountry (city) {
				var country;
				collections.citiesCollection.each(function (num) {
					if(num.get('id') === city) {
						country = num.get('location');
					}
				})
				
				return country;
			}

            var locationCountry = findCountry(location.locationCity)			
			if(locationCountry !== country) {
					skip = false;
			}
			
			return skip;
		},
		
        validation: {
            name: [
            	{
                    required: true,
                    msg: 'Field cannot be empty'
                },{
                	minLength: 5,
                    msg: 'Min length is 5 symbols'
                }, {
                    maxLength: 30,
                    msg: 'Max length is 30 symbols'
                },{
                    pattern: 'lettersNumbersRegEx',
                    msg: 'Latin letters, numbers, space and dash "-"'
                }
		    ],
		    locationCountry: [
		    	{
		    		required: true,
                	msg: 'Field cannot be empty'
		    	}
		    ],
		    date: [
		    	{
		    		required: true,
                	msg: 'Field cannot be empty'
		    	}
		    ]
		}		
    });
})(App.Holidays);