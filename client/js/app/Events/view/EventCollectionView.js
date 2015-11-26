'use strict';
(function (This) {
    This.EventCollectionView = App.BaseView.extend({
        tagName: 'div',
        className: 'events',
        tpl: templates.eventCollectionTpl,
        itemViews: [],

        //methods: renderGrid, startSearch, changePage, show, renderAfterDestroy, sortByName, sortByType - are in BaseView
		events: {
            'click .add': 'add',
            'click .name-header': 'sortByName',   //in BaseView
            'click .type-header': 'sortByType',
			'click .fullEventClose': 'fullEveClose',
			'keydown': 'closeOnEscape',
            'click .pageEl': 'changePage',        //in BaseView
            'keyup .searchField': 'startSearch',   //in BaseView
			'keypress': 'updateOnEnter'
        },

        initialize: function () {
            this.collection = collections.eventsCollection;
            this.originCollection = collections.eventsCollection;
            this.settingsCollection = collections.eventTypes;
            this.pageSize = 10;
            this.pageIndex = 0;
            this.nameFlag = 'DESC';
            this.typeFlag = 'ASC';
            this.listenTo(this.collection, 'add', this.renderGrid);
            this.listenTo(this.collection, 'destroy', this.renderAfterDestroy);
			this.listenTo(collections.eventsCollection, 'add', this.renderGrid);
			$(document).on('keydown', this.closeOnEscape.bind(this));
        },

        render: function () {
            this.pageCount = Math.ceil(this.collection.length / this.pageSize);
            this.$el.empty();
            this.$el.html(this.tpl());
            this.renderGrid();

            return this;
        },

        renderOne: function (model) {
            var eventView = new App.Events.EventView({model: model});
            this.$('.event-list').append(eventView.render().el);
			this.itemViews.push(eventView);
        },

        add: function () {
            cs.mediator.publish('CreateEvent');
		    this.fullEveClose();
        },
		
		closeOnEscape: function (e) {
            if (e.which === ESC) {
                this.fullEveClose();
            }
        },
		
		fullEveClose: function () {
			$('.toshow').addClass('hidden');
			$('.toshowfirst').switchClass('col-md-8', 'col-md-12', 1000);
			$('.shortInfo').removeClass('warning');
		},


        sortByType: function () {
            var flag = 'typeFlag',
                field = 'type',
                $el = this.$('.type-header');

            this.sortById(flag, field, $el);
        },

		updateOnEnter: function (e) {
            if (e.keyCode === ENTER) {
                e.preventDefault();
            }
        }
    });
})(App.Events);