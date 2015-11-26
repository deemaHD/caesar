var DataLoaderChange = function () {   
    this.loadCollections = function (main, path) {
        $.get(path, function (preloadData) {
            _.each(preloadData, function (collection, key) {
                collections[key].set(collection);
            });
        })
    }
};
