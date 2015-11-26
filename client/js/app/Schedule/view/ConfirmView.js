(function (This) {
	This.ScheduleConfirmView = App.Messenger.ConfirmView.extend({
        template: templates.scheduleConfirmTpl,

        events: {
            'click input[type="checkbox"]': 'notToAskAgain',
            'click .delete': 'delete',
            'click .cancel': 'close'
        },

        initialize: function () {
            this.isAsk = true;
        },

        notToAskAgain: function (event) {
            var $el = $(event.currentTarget);
  
            if ($el.is(':checked')) {
                this.isAsk = false;
            } else {
                this.isAsk = true;
            };
        },

        set: function (callbackYes, callback, options) {
        	this.callbackYes = callbackYes;
        	this.options = options;
            this.callback = callback;
        },

        delete: function () {
            this.callbackYes(this.options);
            this.remove();

            cs.mediator.publish('NotToAskResponse', this.isAsk, 'newWeek');
            this.callback();
        },

        close: function () {
            this.remove();

            cs.mediator.publish('NotToAskResponse', this.isAsk, 'oldWeek');
            this.callback();
        },

        render: function () {
            this.createMessage();
            this.$el.html(this.template({message: this.message, newEvent: this.newWeekName, oldEvent: this.oldWeekName}))
                .removeClass('hidden');

            return this;
        },

        createMessage: function () {
            var oldDays = this.options.oldWeek.get('days'),
                oldDayNumber = Object.keys(oldDays),
                oldTimeline = Object.keys(oldDays[oldDayNumber]),
                oldEventId = Number(oldDays[oldDayNumber][oldTimeline]),
                oldEvent = collections.eventsCollection.get(oldEventId),
                conflictsDate = new Date (this.options.oldWeek.get('startDate')),
                newDays = this.options.newWeek.get('days'),
                newEventId = Number(newDays[oldDayNumber][oldTimeline]),
                newEvent = collections.eventsCollection.get(newEventId);

            conflictsDate.setDate(conflictsDate.getDate() + (oldDayNumber - 1));

            this.message = oldEvent.get('name') + ' and ' + newEvent.get('name') + ' use the same resources at ' 
                            + This.daysName[oldDayNumber] + ' ' + This.DateNormalize(conflictsDate.getMonth() + 1) + '-'
                            + This.DateNormalize(conflictsDate.getDate()) + '-' + conflictsDate.getFullYear();

            this.newWeekName = newEvent.get('name');
            this.oldWeekName = oldEvent.get('name');

        }
	})
})(App.Schedule);