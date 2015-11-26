templates.eventForEditTpl = _.template([
    '<td><%= name %></td>',
    '<td><%= type %></td> ',
    '<td class="col-lg-2">',
        '<i class="edit glyphicon glyphicon-edit customGlyphBtn "></i>',
        '<i class="dell glyphicon glyphicon-trash customGlyphBtn "></i>',
    '</td>'
].join(''));