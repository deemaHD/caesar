templates.cityTpl = _.template([
        '<div class="panel panel-default">',
            '<div class="panel-heading">',
                '<p>Select country to add city</p>',
                 '<select class="form-control" id="selectCountry" name="locationCountry">',
                    '<%_.each(locationCountry, function (country) {%>',
                        '<option value="<%= country.id %>">',
                            '<%= country.countryName %>',
                        '</option>',
                    '<%})%>',
                '</select>',
            '</div>',
            '<ul id="citiesScroll" class="cities list-group">',
            '</ul>',
            '<div class="input-group">',
                '<input name="name" class="new-city form-control" type="text"  placeholder="Select a country at first">',
				'<span class="input-group-btn">',
					'<button class="btn btn-default addSettings" type="button">Add</button>',
				'</span>',
            '</div>',
        '</div>'
].join(''));