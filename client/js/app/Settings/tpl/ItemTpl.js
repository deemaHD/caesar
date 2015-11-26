templates.itemTpl = _.template([
    '<div class="view">',
        '<label class="label-type"><%= name %></label>',
           '<button class="destroy"><i class="glyphicon glyphicon-trash sizeSetings"></i></button>',
           '<button class="editSetings"><i class="glyphicon glyphicon-edit sizeSetings"></i></button>',
    '</div>',
    '<input class="edit-type" value="<%= name || countryName %>">'
].join(''));