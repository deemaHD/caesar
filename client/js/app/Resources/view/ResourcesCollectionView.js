(function (This) {
    This.CollectionView = App.BaseView.extend({
        tagName: 'div',
        className: 'resource',
        template: templates.resourceCollectionTpl,
        itemViews: [],

        //methods: renderGrid, startSearch, changePage, show, renderAfterDestroy, sortByName - are in the BaseView
        events: {
            'click .create': 'create',
            'click .pageEl': 'changePage',          // in BaseView
            'click .name-header': 'sortByName',     // in BaseView
            'click .type-header': 'sortByType',
            'keyup .searchField': 'startSearch',    // in BaseView
			'keypress': 'updateOnEnter'
        },
    
        initialize: function () {
            this.collection = collections.resouresCollection;
            this.originCollection = collections.resouresCollection;
            this.settingsCollection = collections.resourceTypes;
            this.pageSize = 10;
            this.pageIndex = 0;
            this.nameFlag = 'DESC';
            this.typeFlag = 'ASC';
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'destroy', this.renderAfterDestroy);
            this.listenTo(collections.resouresCollection, 'add', this.render);
			$('body').one('keypress', this.updateOnEnter.bind(this));
        },
    
        render: function () {
            this.pageCount = Math.ceil(this.collection.length / this.pageSize);
            this.$el.empty();
            this.$el.html(this.template());
            this.renderGrid();
            return this;
        },

        renderOne: function (model) {
            var view = new App.Resources.ResourcesModelHomepageView({model: model});
            this.itemViews.push(view);
            this.$('.resource-list').append(view.render().el);
        },

        create: function () {
            cs.mediator.publish('CreateResource'); //publish to Controller
        },

        sortByType: function () {
            var flag = 'typeFlag',
                field = 'type',
                $el = this.$('.type-header');

            this.sortById(flag, field, $el);
        },
        
        sorting: function () {
            var sortingType = $('.resourceSorting').val();
            
            if (sortingType === '0') {
                this.collection.comparator = function(resource) {
                    return resource.get('type');
                };
                this.collection.sort();
            } else {
                this.collection.comparator = function(resource) {
                    return resource.get('name');
                };
                this.collection.sort();
            }

            this.renderGrid();
        },
		
		updateOnEnter: function (e) {
            if (e.keyCode === ENTER) {
                e.preventDefault();
            }
        }
    });
})(App.Resources);
