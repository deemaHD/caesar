(function (This) {
    This.CreateEditView = App.BaseModalView.extend({
		className: 'modal fade in resourseScroll',
        template: templates.editResourceTpl,

        events: {
			'click .save': 'save',
            'click .cancel': 'cancel',
			'keydown': 'closeOnEscape',
            'keydown': 'switch',
            'keypress': 'updateOnEnter',
			'click .chekType' : 'checkType',
            'blur input': 'showHints'
        },

        initialize: function () {
            this.model = this.model || new This.ResourcesModel();
            this.defaultModelJSON = this.model.toJSON();
            Backbone.Validation.bind(this, {invalid: this.showHints});

            $('body').on('keypress', this.updateOnEnter.bind(this));
            $('body').on('keydown', this.closeOnEscape.bind(this));
        },

        render: function () {
            var resourceTypes = collections.resourceTypes.toJSON(),
                isNewModel = this.model.isNew(),
			    type = this.model.get('type'),
                groupId = collections.resourceTypes.getIdByName('group'),
                startDate = this.model.get('dateStart'),
                finishDate = this.model.get('dateFinish'),
			    classForHide = 'hide';
				
				if (type === groupId) {
				    classForHide = "";
			    }

            this.$el.append(this.template({
                name: this.model.get('name'),
                typeId: type,
                resourceTypes: resourceTypes,
				dateStart: startDate,
				dateFinish: finishDate,
				classForHide: classForHide,
                useInSchedule: this.model.get('useInSchedule')
            }));

			this.$("#datetimepickerStart").datetimepicker({
				locale: 'en',
				format: 'MM/DD/YYYY',
                minDate: isNewModel? new Date() : startDate
                
			});
			
			this.$("#datetimepickerFinish").datetimepicker({
				locale: 'en',
				format: 'MM/DD/YYYY',
                minDate: isNewModel? new Date() : finishDate
			});
			
			this.$("[name='resourseCheckbox']").bootstrapSwitch();
			$('body').css('overflow-y', 'hidden');
			
            this.setTabIndex();
            
            return this;
        },

        save: function () { 
            var isNewModel = this.model.isNew();
            this.$nameValue = this.$('.name').val();

            if(!isNewModel && this.$nameValue === this.model.get('name')) {
                this.submit();
            } else {
                this.checkResourceName(this.$nameValue);
            }
        },


        checkResourceName: function (value) {
            if (!isNameTaken(value, collections.resouresCollection.toJSON())) {
                this.submit();
            } else {
                cs.mediator.publish('Hint','This name is already taken', this.$('.name'));
            }
        },

        submit: function () {
            var $typeValue = this.$('.type').val()? Number(this.$('.type').val()): '',
                $nameValue = this.$('.name').val().trim(),
			    $dateStart = this.model.get('dateStart'),
				$dateFinish = this.model.get('dateFinish'),
                $isChecked = this.$('input[type=checkbox]').is(":checked"),
                groupId = collections.resourceTypes.getIdByName('group'),
                isNewModel = this.model.isNew(),
                user = User.get(),
                attributes;

                if ($typeValue === groupId) {
                    $dateStart = this.$('#dateStart').val();
                    $dateFinish = this.$('#dateFinish').val();
                }				

            attributes = {
                name: $nameValue,
                type: $typeValue,
                locationCity: user.locationCity,
				dateStart: $dateStart,
				dateFinish: $dateFinish,
                useInSchedule: $isChecked
            };

            this.model.save(attributes);
            if (this.model.isValid()) {
                collections.resouresCollection.add(this.model);
				
                cs.mediator.publish( //publish to Messenger's Controller
                    'Notice',
                    isNewModel? 'You succesfully added a new resource': 'Information succesfully changed'
                );
				this.changeClassAndCancel('ResourcesViewClosed');
            }
        },
        
		cancel: function () {
            this.undoChanges();
            this.changeClassAndCancel('ResourcesViewClosed');
            $('body').off();
        },

        undoChanges: function () {
            this.model.off('change', this.preValidate);
            this.model.set(this.defaultModelJSON);
        },
		
		checkType: function () {
			var type = Number(this.$('.type').val()),
                groupId = collections.resourceTypes.getIdByName('group');
			if (type === groupId) {
				$('.hideData').removeClass('hide');
			} else {
				$('.hideData').addClass('hide');
			}
		}
    });
})(App.Resources);
