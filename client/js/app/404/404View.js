(function (This)  {
    This.ErrorPageView = Backbone.View.extend({
        className: 'hidden',
        tpl: templates.ErrorPageTpl,

        render: function () {
            this.$el.append(this.tpl());

            return this;
        },

        show: function () {
            this.$el.removeClass('hidden');
        }
    });
})(App.ErrorPage);