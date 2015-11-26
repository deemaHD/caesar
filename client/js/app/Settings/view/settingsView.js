'use strict';
(function (This) {
    This.SettingsView = Backbone.View.extend({
        tagName: 'div',
        className: 'settings',
        
        initialize: function () {
            this.eventsView = new App.Settings.EventTypeCollectionView();
            this.resourcesView = new App.Settings.ResourceTypeCollectionView();
            this.cityView = new App.Settings.CityCollectionView();
            this.countryView = new App.Settings.CountryCollectionView();
        },
        
        render: function () {
            this.$el.append(this.resourcesView.render().el);
            this.$el.append(this.eventsView.render().el);
            this.$el.append(this.cityView.render().el);
            this.$el.append(this.countryView.render().el);
            return this;
        },

        show: function () {
            this.$el.removeClass('hidden');
        }
    });
})(App.Settings);