'use strict';
(function (This) {
    This.AccountCollectionView = App.BaseView.extend({
		template: templates.accountCollectionTpl,
        className: 'accounts',
        tagName: 'div',
        itemViews: [],

        events: {
            'click .create': 'add',
            'click .name-header': 'sortByName',
            'click .login-header': 'sortByLogin',
            'click .location-header': 'sortByLocation',
			'keypress': 'updateOnEnter'
        },

        initialize: function () {
            this.nameFlag = 'DESC';
            this.loginFlag = 'ASC';
            this.locationFlag = 'ASC';
            this.collection = collections.accountsCollection;
            this.settingsCollection = collections.citiesCollection;
            this.listenTo(this.collection, 'add', this.renderGrid);
			this.listenTo(collections.accountsCollection, 'all', this.render);
			$('body').one('keypress', this.updateOnEnter.bind(this));
        },

        render: function () {
           this.$el.empty();
           this.$el.html(this.template);
           this.renderGrid();
           return this;
        },

        renderGrid: function () {
            var fragment = document.createDocumentFragment();
            _.each(this.itemViews, function (view) {
                view.remove();
            });
            this.collection.each(function (account) {
                fragment.appendChild(this.renderOne(account));
            }, this);

            this.$('.account-list').append(fragment);
        },

        renderOne: function (model) {
            var accountView = new App.Accounts.AccountView({model: model});
            this.itemViews.push(accountView);
            accountView.render();
            return accountView.el;
        },

        add: function () {
            cs.mediator.publish('CreateAccount');
        },

        sortByLogin: function () {
            var flag = 'loginFlag',
                sortingAttribute = 'login',
                $el = $('.login-header');

            this.sortFunction(flag, sortingAttribute, $el);
            this.renderGrid();
        },

        sortByLocation: function () {
            var flag = 'locationFlag',
                sortingAttribute = 'locationCity',
                $el = this.$('.location-header');

            this.sortById(flag, sortingAttribute, $el);
            this.renderGrid();
        },
		
		updateOnEnter: function (e) {
            if (e.keyCode === ENTER) {
                e.preventDefault();
            }
        }
    });
})(App.Accounts);