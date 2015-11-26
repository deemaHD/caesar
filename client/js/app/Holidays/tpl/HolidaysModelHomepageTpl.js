templates.holidaysModelHomepageTpl = _.template([
	'<td class="showHollidaysDisableCity"><%= name %></td>',
	'<td><%= date %></td>',
	'<td><%= locationCountry %></td>',
	'<% if(role === "Admin"){%>',
		'<td>',
			'<ul class="holidayTooltip">',
				'<% city.forEach(function (item) { %>',
					'<% var cities = locationCities.get(item) %>',
					'<li> <%= cities.get("name") %> </li>',
				'<% }) %>',
			'</ul>',
		'</td>',
	'<%}%>',
    '<td class="col-lg-1">',
        '<% if(role === "Admin"){%>',
            '<i class="glyphicon glyphicon-edit customGlyphBtn hollidaysHide"></i>',
            '<i class="glyphicon glyphicon-trash customGlyphBtn hollidaysHide"></i>',
        '<%}%>',
        '<i class="glyphicon glyphicon-thumbs-up isActive customGlyphBtn"></i>',
	'</td>'
].join(''));