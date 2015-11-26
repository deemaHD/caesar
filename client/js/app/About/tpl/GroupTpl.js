templates.groupTpl = _.template([
    '<div class="row group-container">',
        '<div class="col-md-4 col-sm-4 group-logo-container">',
            '<div class="">',
                '<div class="caption head">',
                    '<h2 class="myFonts"><%= name %></h2>',
                    '<img class="group-logo img-circle positionCentr" src="img/logo<%= id %>.jpg">',
                '</div>',
            '</div>',
        '</div>',
        '<div class="col-md-8 col-sm-8 group-info-container">',
            '<div class="contributors-name-container">',
            '</div>',
        '</div>',
    '</div>'
].join(''));
