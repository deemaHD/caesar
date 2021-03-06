templates.groupCollectionTpl = _.template([
    '<div class="panel panel-default group-collection">',
        '<div class="panel-heading">',
            '<div class="row">',
                '<div class="col-md-6 col-sm-6">',
                    '<h4>',
                        '<span class="glyphicon glyphicon-wrench game" aria-hidden="true"></span> ',
                        'Contributors ',
                    '</h4>',
                '</div>',
                '<div class="col-md-3 col-sm-3 gameShow">',
				'Score: ',
				'<span class="score"></span>',
                '</div>',
                '<div class="col-md-3 col-sm-3 gameShow">',
				'Time: ',
				'<span id="timer"></span>',
                '</div>',
            '</div>',
        '</div>',
        '<div class="list-group-container row">',
        '</div>',
    '</div>'
].join(''));