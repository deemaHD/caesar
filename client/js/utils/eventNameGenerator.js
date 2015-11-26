App.EventNameGenerator = function (_context) {
    var that = _context,
        isChanged = false,
        prevName = '';
    
    this.setUpPreviousName = function () {
        var name = that.$('.name').val();

        if (name !== '') {
            prevName = name;
            isChanged = true;
        }
    },

    this.generateEventName = function (_resource) {
        var $name = that.$('.name'),
            resource = _resource.toJSON();

        if (resource.type === 0) {
            if (isChanged) {
                $name.val('');
                isChanged = false;
            }

            if ($name.val() === '') {
                $name.val(resource.name);    
            } else {
                $name.val($name.val() + ', ' + resource.name);
            }                
        }
    },

    this.removeEventName = function (_id) {
        var $name = that.$('.name'),
            id = Number(_id);

        _.each(that.resourceCollection.toJSON(), function (resource) {
            if (resource.id === id && resource.type === 0) {
                var eventName = $name.val(),
                    newName = '';

                newName = eventName.replace(resource.name, '');

                if (newName[newName.length - 2] === ',') {
                    newName = newName.substring(0, newName.length - 2);
                }

                if (newName[0] === ',') {
                    newName = newName.substring(2);
                }

                $name.val(newName);
            }
        });
    },

    this.setName = function () {
        var $name = that.$('.name'),
            name = $name.val();

        if (name !== '') {
            prevName = name;
        }
        isChanged = true;
    },

    this.returnName = function () {
        var $name = that.$('.name'),
            name = $name.val();

        if (prevName !== '') {
            $name.val(prevName);
            isChanged = true;
        }
    }
};