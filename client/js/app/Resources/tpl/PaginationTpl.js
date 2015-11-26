templates.paginationTpl = _.template([
    '<ul class="pagination">',
        '<% for (var i = 1; (i <= pageCount) && (pageCount > 1); i++) { %>',
            '<li class="pageEl" value="<%= i %>"><a><%= i %></a></li>',
        '<% }; %>',
    '</ul>'
].join(''));