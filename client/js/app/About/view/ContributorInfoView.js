"use strict";

(function (This) {
    This.ContributorsInfoView = Backbone.View.extend({
        tagName: 'div',
        className: 'contributors-full-info-container',
        view: '',
		tooltip: '',

        template: templates.contributorFullInfoTpl,

        render: function (itaName) {
		    var modelJSON = this.model;
			
            this.tooltip = This.Tooltip;
    		modelJSON.itaName = itaName;
            this.tooltip.show(this.template(modelJSON));

            return this;
        },

        hide: function () {
            this.tooltip.hide();
        }
    });
})(App.About);