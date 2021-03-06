templates.editResourceTpl = _.template([
 	'<div class="modal-backdrop fade in"></div>',
	'<div class="modal-dialog animated slideInDown myAnimateClass">',
		'<div class="modal-content">',
			'<div class="modal-header">',
				'<button type="button" class="close cancel"><span aria-hidden="true">&times;</span></button>',
				'<h4 class="modal-title"><%= (name === "")? "Create resource": "Edit resource" %></h4>',
			'</div>',
			'<div class="modal-body clearfix">',
				'<div class="form-group" class="col-xs-4">',
					'<label for="name">Type name</label>',
					'<span class="hint hidden"></span>',
					'<input type="text" name="name" class="name form-control tabIndex" placeholder="Type resource name" value="<%= name %>">',
				'</div>',
				'<div class="form-group">',
					'<label for="select">Pick one of the resources types:</label>',
					'<span class="hint hidden"></span>',
					'<select class="type form-control tabIndex" size=5 name="type">',
						'<%_.each(resourceTypes, function (type) {%>',
							'<% if (type.id === typeId) { %>',
								'<option selected value="<%= type.id %>" class="chekType">',
									'<%= type.name %>',
								'</option>',
							'<% } else {%>',
								'<option value="<%= type.id %>" class="chekType">',
									'<%= type.name %>',
								'</option>',
							'<% }%>',
						'<%})%>',
					'</select>',
				'</div>',
				'<div class="form-group hideData <%= classForHide %>" class="col-xs-4">',
					'<label>Choose start date</label>',
					'<div class="input-group" id="datetimepickerStart">',
					'<span class="hint hidden"></span>',
						'<input type="text" class="form-control date holidayDate input-group-addon tabIndex" name = "dateStart" id = "dateStart" value="<%= dateStart %>">',
						'<span class="input-group-addon">',
							'<span class="glyphicon glyphicon-calendar"></span>',
						'</span>',
					'</div>',
				'</div>',
				'<div class="form-group hideData <%= classForHide %>" class="col-xs-4">',
					'<label>Choose end date</label>',
					'<div class="input-group" id="datetimepickerFinish">',
					'<span class="hint hidden"></span>',
						'<input type="text" class="form-control date holidayDate input-group-addon tabIndex" name = "dateFinish" id = "dateFinish" value="<%= dateFinish %>">',
						'<span class="input-group-addon">',
							'<span class="glyphicon glyphicon-calendar"></span>',
						'</span>',
					'</div>',
				'</div>',
				'<div class="form-group checkbox">',
					'<label>',
						'<input type="checkbox" class="tabIndex" name="resourseCheckbox" data-size="mini" data-on-text="Yes" data-off-text="No" data-off-color="warning"',
							'<% if (useInSchedule) { %>',
								'checked="<%= "checked" %>"',
							'<% } %> > use in schedule',
					'</label>',
				'</div>',
			'</div>',
			'<div class="modal-footer">',
				'<button id="save" type="button" class="btn btn-info save pull-right tabIndex">',
					'<i class="glyphicon glyphicon-floppy-saved"></i> Save',
				'</button>',
				'<button type="button" class="btn btn-default cancel pull-left tabIndex">',
					'<i class="glyphicon glyphicon-floppy-remove"></i> Back',
				'</button>',
			'</div>',
		'</div>',
	'</div>'
].join(''));