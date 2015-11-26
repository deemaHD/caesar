var DataLoader = function () {
    var $main = $('#main');
    start();
    
    function start () {
        initCollections();
        renderLoadingBar();
    }
    
    function initCollections () {
        collections.resouresCollection = new App.Resources.ResourcesCollection();
        collections.eventsCollection = new App.Events.EventCollection();
        collections.scheduleCollection = new App.Schedule.Schedule();
        collections.eventTypes = new App.Settings.EventTypeCollection();
        collections.resourceTypes = new App.Settings.ResourceTypeCollection();
        collections.holidaysCollection = new App.Holidays.HolidaysCollection();
        collections.accountsCollection = new App.Accounts.AccountsCollection();
        collections.citiesCollection = new App.Settings.CitiesCollection();
        collections.countriesCollection = new App.Settings.CountriesCollection();
    }
    
    function renderLoadingBar () {
        $main.append(loadingTpl);
    }
    
    this.loadCollections = function (main) {
        $.get('/preload', function (preloadData) {
            _.each(preloadData, function (collection, key) {
                collections[key].set(collection);
            });
            main();
            $('.sequence').remove();
        })
    }
};
