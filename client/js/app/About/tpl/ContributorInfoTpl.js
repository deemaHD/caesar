templates.contributorFullInfoTpl = _.template([
    '<div id = "contributorsNames" class="contributorsNames animated zoomIn">',
        '<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="left" title="Tooltip on left">',
            '<div class="form-group">',
                '<div class="grey" name="name"><%= firstName %> <%= lastName %>',
                '</div>',
            '</div>',
            '<div class="form-group">',
                '<label>Группа:</label>',
                '<span class="grey" itaName="itaName"><%= itaName %> </span>',
            '</div>',
            '<div class="media">',
                '<div class="col-md-12 user-logo-container">',
                    '<img class="group-logo img-circle " src="img/<%= id %>.jpg">',
                '</div>',
            '</div>',
        '</button>',
    '</div>'
].join(''));