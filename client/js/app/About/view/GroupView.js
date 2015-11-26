"use strict";

(function (This) {
    This.GroupView = Backbone.View.extend({
        tagName: 'div',
        className: 'group-container',

        template: templates.groupTpl,

        initialize: function (_group, _contributors) {
            this.model = _group;
            this.inner = new This.ContributorsCollectionView({
                groupId: this.model.id,
                itaName: this.model.get('itaName'),
                contributors: _contributors
            });
        },

        render: function () {
            this.$el.html(this.template(this.model.attributes));
            this.$('.contributors-name-container').append(this.inner.render(this.model.id).el);
            return this;
        }
    });
})(App.About);