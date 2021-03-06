templates.authenticationTpl = _.template([
    '<div class="modal-backdrop fade in"></div>',
        '<div class="modal-dialog modal-md confirm-dialog">',
            '<div class="modal-content">',
                '<div class="modal-header">',
                    '<h4 class="modal-title"><%= message %> </h4>',
                    '<% if (errorMsg) { %>',
                        '<p class="error" style="color: red;"><%= errorMsg %> </p>',
                    '<% }%>',
                '</div>',
                    '<div class="form-group">',
                            '<input type="text" class="form-control" style="margin-top: 10px;" id="InputLogin" placeholder="Enter Login">',
                            '<input type="text" class="form-control" style="margin-top: 10px;" id="InputPassword" placeholder="Enter Password">',
                    '</div>',
                '<div class="modal-body clearfix">',
                    '<div class="btn-toolbar pull-right">',
                        '<button type="button" class="btn btn-default send">Send</button>',
                        '<button type="button" class="btn btn-default cancel">Cancel</button>',
                    '</div>',
                '</div>',
            '</div>',
        '</div>',
    '</div>'
].join(''));