templates.resourceTypeTpl = _.template([
        '<div class="panel panel-default">',
            '<div class="panel-heading">',
                '<p>Resources Types</p>',
            '</div>',
            '<ul id="resourceScroll" class="resource-type list-group">',
            '</ul>',
            '<div class="input-group">',
                '<input name="name" class="new-type form-control" type="text"  placeholder="Type">',
				'<span class="input-group-btn">',
					'<button class="btn btn-default addResSettings" type="button">Add</button>',
				'</span>',
            '</div>',
        '</div>'
].join(''));