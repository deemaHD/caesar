(function (This) {
    This.CollectionView = App.BaseView.extend({
        tagName: 'div',
        className: 'holiday',
        template: templates.holidaysCollectionTpl,
		filterPressed: 'all',
        itemViews: [],

        //methods: renderGrid, startSearch, changePage, show, renderAfterDestroy - are in BaseView
        events: {
            'click .create': 'create',
            'click .countryFilter': 'filterHandler',
            'click .pageEl': 'changePage',
            'keyup .searchField': 'startSearch',
            'click .name-header': 'sortByName',
            'click .location-header': 'sortByLocation',
            'click .date-header': 'sortByDate',
			'keypress': 'updateOnEnter'
        },

        initialize: function () {
            this.collection = collections.holidaysCollection;
            this.originCollection = collections.holidaysCollection;
            this.settingsCollection = collections.countriesCollection;
            this.pageSize = 10;
            this.pageIndex = 0;
            this.listenTo(this.collection, 'add', this.renderGrid);
            this.listenTo(this.collection, 'destroy', this.renderAfterDestroy);
            this.listenTo(collections.countriesCollection, 'all', this.render);
			this.listenTo(collections.holidaysCollection, 'all', this.render);
			$('body').one('keypress', this.updateOnEnter.bind(this));
            cs.mediator.subscribe('RenderHollidays', this.renderAfterChangeRole, null, this);
        },

        render: function () {
			var locStor = localStorage.getItem("countryFilter"),
                manRole = localStorage.getItem("manRole"),
			    user = User.get();			
			
            this.$el.empty().append(this.template({
				counties: collections.countriesCollection.toJSON(),
                role:  user.role
            }));
			
            if(!locStor){
				this.$('.holliday' + this.filterPressed).addClass('active');
			} else {
				this.filterPressed = locStor;
			    this.$('.holliday' + this.filterPressed).addClass('active');
			}

            this.renderAfterChangeRole();
			
			this.$('.countryFilter').addClass('buttonHide');
			this.$('.hollidaysHide').addClass('buttonHide');
			
			if(manRole === 'admin') {
				this.$('.countryFilter').removeClass('buttonHide');
				this.$('.hollidaysHide').removeClass('buttonHide');
			} else {
				this.$('.countryFilter').addClass('buttonHide');
				this.$('.hollidaysHide').addClass('buttonHide');
			} 

            return this;
        },

        renderOne: function (model) {
			var manRole = localStorage.getItem("manRole");
			var skip = model.skippedByLocation();

			if(manRole === 'admin') {
				skip = true;
			}

				var view = new This.HolidaysModelHomepageView({model: model});
				this.$('.holidays-list').append(view.render().el);
				this.itemViews.push(view);

			
			if(manRole === 'admin') {
				$('.countryFilter').removeClass('buttonHide');
				$('.hollidaysHide').removeClass('buttonHide');
			} else {
				$('.countryFilter').addClass('buttonHide');
				$('.hollidaysHide').addClass('buttonHide');
			} 
           
        },

        create: function () {
            cs.mediator.publish('CreateHoliday'); //publish to Controller
        },

        filterHandler: function (e) {
            var filter = e.target.classList[0];
			
			localStorage.setItem("countryFilter", filter);
			
			this.filterPressed = filter;

            if (filter === 'all') {
                this.collection = collections.holidaysCollection;
                this.pageIndex = 0;
                this.renderGrid();
            } else {
                this.collection = this.originCollection.filterByCountry(filter);

                this.pageIndex = 0;
                this.renderGrid();
            }
			
			$('.countryFilter').removeClass('active');
			$(e.toElement).addClass('active');
        },

        sortByLocation: function () {
            var flag = 'locationFlag',
                sortingAttribute = 'locationCountry',
                $el = this.$('.location-header');

            this.sortById(flag, sortingAttribute, $el);
            this.renderGrid();
        },

        sortByDate: function () {
            var flag = 'dateFlag',
                sortingAttribute = 'date',
                $el = this.$('.date-header');

            this.sortFunction(flag, sortingAttribute, $el);
            this.renderGrid();
        },
		
		updateOnEnter: function (e) {
            if (e.keyCode === ENTER) {
                e.preventDefault();
            }
        },
		
		renderAfterChangeRole: function  () {
            var manRole = localStorage.getItem("manRole"),
                countryFilter = localStorage.getItem("countryFilter"),
                locationCity = User.get().locationCity;

                function findCountry (city) {
                var country;
                collections.citiesCollection.each(function (num) {
                    if(num.get('id') === city) {
                        country = num.get('location');
                    }
                });

                return country;
            }

            if(manRole !== 'admin') {
                this.collection = this.originCollection.filterByCountry(findCountry(locationCity));
            } else {
                if(countryFilter === 'all') {
                    this.collection = this.originCollection;
                } else {
                    this.collection = this.originCollection.filterByCountry(countryFilter);
                }
            }
			this.renderGrid();
		}
    });
})(App.Holidays);
