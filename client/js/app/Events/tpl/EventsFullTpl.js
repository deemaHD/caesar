'use strict';
templates.eventFullTpl = _.template([
    '<tr><td><%= name %></td></tr>',
	'<tr><td><%= type %></td></tr>',
	'<%= resourc %>'
].join(''));