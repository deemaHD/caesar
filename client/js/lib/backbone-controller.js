'use strict';
Backbone.Controller = function (options) {
    _.extend(this, _.pick(options, controllerOptions));
    this.initialize.apply(this, arguments);
    this.setupSubscribes();
};

var controllerOptions = ['subscribes', 'mediator', 'createEditView', 'el', 'collectionView'];

_.extend(Backbone.Controller.prototype, {
        initialize: function () {
        },

        setupSubscribes: function () {
            var subscribes = _.result(this, 'subscribes'),
                method;

            for (var key in subscribes) {
                method = subscribes[key];
                if (!_.isFunction(method)) {
                    method = this[method];
                }
                this.mediator.subscribe(key, _.bind(method, this));
            }
        },
        start: function () {
            this.el.append((this.collectionView.render().el));
        },

        showAll: function () {
            this.hideAll();
            this.crudView && this.crudView.remove();
            this.collectionView.show();
        },

        createView: function () {
            this.crudView && this.crudView.remove();
            this.crudView = new this.createEditView();
            this.el.append(this.crudView.render().el);
        },

        editViewById: function (id) {
            var model = this.collection.get(id);
            if (model) {
                this.editView(model);
            } else {
                cs.mediator.publish('Show404');
            }
        },

        editView: function (model) {
            this.crudView && this.crudView.remove();
            this.crudView = new this.createEditView({
                model: model
            });
            this.el.append(this.crudView.render().el);
        },

        viewClosed: function () {
            this.crudView && this.crudView.remove();
        },

        hideAll: function () {
            this.el.children().addClass('hidden');
        }
    },

    Backbone.Controller.extend = function (protoProps, staticProps) {
        var parent = this;
        var child;

        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function () {
                return parent.apply(this, arguments);
            };
        }

        _.extend(child, parent, staticProps);

        var Surrogate = function () {
            this.constructor = child;
        };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;

        if (protoProps) _.extend(child.prototype, protoProps);

        child.__super__ = parent.prototype;

        return child;
    });