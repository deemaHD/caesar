templates.countryTpl = _.template([
        '<div class="panel panel-default">',
            '<div class="panel-heading">',
                '<p>Countries</p>',
            '</div>',
            '<ul id="countyScroll" class="countries list-group">',
            '</ul>',
            '<div class="input-group">',
                '<input name="countryName" class="new-country form-control" type="text"  placeholder="Type">',
				'<span class="input-group-btn">',
					'<button class="btn btn-default addCountySettings" type="button">Add</button>',
				'</span>',
            '</div>',
        '</div>'
].join(''));