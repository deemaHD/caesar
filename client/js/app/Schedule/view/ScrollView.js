(function (This) {
	This.ScrollView = Backbone.View.extend({
		tagName: 'a',
		className: 'btn btn-primary',

		events: {
			'mousedown': 'showDiapazon'
		},

		initialize: function () {
			this.firstTimeline = '12:30';
			this.lastTimeline = '17:00';

			this.$el.attr('href','#12:30');
		},

		setTableEl: function ($tableDiv) {
			this.$div = $tableDiv;
			this.$tr = this.$div.find('tr[timeline="12:30"]').nextUntil('tr[timeline="17:30"').andSelf();

			
			//this.$tr.on('mousedown', this.changeHeight.bind(this));
		},

		render: function () {
			this.$el.html('Show');
	
			//this.setupCSS();
			return this;
		},

		setupCSS: function () {
			
			this.$div.css('overflow','scroll');
			this.$div.scrollTop(this.$div.find('tr[timeline="12:30"]').position.top);

			this.$div.height(300);
		},

		showDiapazon: function () {
			//this.showRows();
			//this.$div.on ('scroll', this.changeRows.bind(this));
		},

		showRows: function () {
			this.$div.find('tr').hide();
			this.$tr.show();
		},

		changeRows: function () {
			console.log(this.$tr.first().prev().show());
		}
	})
})(App.Schedule);