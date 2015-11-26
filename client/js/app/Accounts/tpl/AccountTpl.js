'use strict';
templates.accountTpl = _.template([
'   <td><%= name + " " + lastName %></td>',
'   <td><%= login %></td>',
'   <td><%= locationCity %></td>',
'   <td><%= role %></td>',
'   <td class="col-lg-1">',
'       <i class="glyphicon glyphicon-edit customGlyphBtn"></i>',
'       <%if(User.get().login !== login) {%> ',
'           <i class="glyphicon glyphicon-trash customGlyphBtn"></i>',
'       <% } %>',
'   </td>'
].join(''));	