templates.resourcesModelHomepageTpl = _.template([
'   <td><%= name %></td>',
'   <td><%= type %></td>',
'   <td><input type="checkbox" disabled',
'       <% if (useInSchedule) { %>',
'           checked="<%= "checked" %>"',
'       <% } %> ></td>',
'   <td class="col-lg-1">',
'       <i class="glyphicon glyphicon-edit customGlyphBtn"></i>',
'       <i class="glyphicon glyphicon-trash customGlyphBtn"></i>',
'   </td>'
].join(''));