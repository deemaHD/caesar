(function (This) {
	This.DownloadView = Backbone.View.extend ({
		template: templates.downloadViewTpl,

		events: {
			'click .downloadZip': 'download',
			'click .preview': 'preview'
		},

		render: function () {
			this.$el.html(this.template());
			return this;
		},

		download: function () {
            $('<form action="/download" method="get"><input type="hiden" name="location" value="' + User.get().locationCity + '"></form>')
            .appendTo('body').submit().remove();
		},

		preview: function () {
			cs.mediator.publish('ShowPreView');
		}
	})
})(App.Schedule);