function setUp (parent, modules) {
    modules.forEach(function (module) {
        parent[module] = {};
    });
};

function isNameTaken (value, collection) {
    var arrayNames = [],
        result;

    collection.forEach(function (element) {
        arrayNames.push(element['name'] || element['countryName']);
    });
                        
    result = _.contains(arrayNames, value);
    return result;
}

function emptyHash () {
    if (!_.isEmpty(hashToDelete)) {
        for (var prop in hashToDelete) {
            if (hashToDelete.hasOwnProperty(prop)) {
                delete hashToDelete[prop];
            }
        }
    }
}

function getValues () {
    var relations = [],
        key;
    for (key in hashToDelete) {
        if (key.length > 0) {
            _.each(hashToDelete[key], function (item) {
                relations.push(key + ':  ' + item.get('name'));
            }); 
        }
    }
    return relations;
}

function firstToUpperCase(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

function validateNameField (value, collection) {
    var errorMsg = {name: 'This name is already taken'};
    return this.isNameTaken(value, collection)? errorMsg: undefined;
}

function toDateObj (strDate) {
    var dateParts = strDate.split('/');
        return new Date(dateParts[2], (dateParts[0] - 1), dateParts[1]);
}

Date.prototype.getWeekNumber = function(){
    var d = new Date(+this);
    d.setHours(0,0,0);
    d.setDate(d.getDate()+4-(d.getDay()||7));
    return Math.ceil((((d-new Date(d.getFullYear(),0,1))/8.64e7)+1)/7);
};

Date.prototype.adjustDate = function(days){
        var date;

        days = days || 0;

        if(days === 0){
            date = new Date( this.getTime() );
        } else if(days > 0) {
            date = new Date( this.getTime() );

            date.setDate(date.getDate() + days);
        } else {
            date = new Date(
                this.getFullYear(),
                this.getMonth(),
                this.getDate() - Math.abs(days),
                this.getHours(),
                this.getMinutes(),
                this.getSeconds(),
                this.getMilliseconds()
            );
        }

        this.setTime(date.getTime());

        return this;
};
