"use strict";

(function (This) {
    This.ContributorsCollectionView = Backbone.View.extend({
        tagName: 'div',
        template: templates.contributorsNamesCollectionTpl,

        initialize: function (options) {
            this.contributors = options.contributors;
            this.itaName = options.itaName;
        },

        preRender: function () {
            var view;

            this.contributors.forEach(function (contributor) {

                view = new This.ContributorsView({model: contributor, itaName: this.itaName});

                this.$('.list-contributors-names-container').append(view.render().el);
                $('[data-toggle="tooltip"]').tooltip()
            }, this);
        },

        render: function () {
            this.$el.html(this.template());

            this.preRender();

            return this;
        }
    });
})(App.About);