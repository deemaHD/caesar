App.BaseModalView = Backbone.View.extend({
    setTabIndex: function () {
        this.$('.tabIndex').each(function (num, el) {
            el.tabIndex = num + 1;
        });
    },
    
    switch: function (e) {
       if (e.keyCode === 9) {
            if (this.$('.tabIndex').last().is(':focus')) {
                e.preventDefault();
                this.$('.name').focus();
            }
        } 
    },

    showHints: function (e, attr, error, selector) {
        var HINT_HEIGHT = 39,
            $group, $hintEl, $el,
            error, positionTop, attrName, value;

        if (arguments.length < 2) {
            if (!e.view) {
                return;
            }
            attrName = e.target.name,
            value = e.currentTarget.value,
            error = this.model.preValidate(attrName, value),
            $el = e.view.$('[name=' + attrName + ']');
        } else {
            $el = e.$('[name=' + attr + ']'),
            error = error;
        }

        $group = $el.closest('.form-group'),
        $hintEl = $group.find('.hint'),
        positionTop = $el.position().top - HINT_HEIGHT;

        if (error) {
            $hintEl.css({
                top: positionTop + 'px',
                right: '2px'
            });
            
            $group.addClass('has-error');
            $hintEl.html(error).removeClass('hidden');

            $el.on('focus', function () {
                $group.removeClass('has-error');
                $hintEl.html('').addClass('hidden');
            });
        }
    },
    
    changeClassAndCancel: function (mediatorEvent) {
        this.$('.myAnimateClass').removeClass('slideInDown').addClass('fadeOutUp');
        setTimeout(function() {
           $('body').css('overflow-y', 'auto');
           cs.mediator.publish(mediatorEvent);
        }, 400);

        $('body').off();
    },
    
    updateOnEnter: function (e) {
        if (e.keyCode === ENTER) {
            this.save();
        }
    },

    closeOnEscape: function (e) {
        if (e.keyCode === ESC) {
            this.cancel();
			
        }
    }
});