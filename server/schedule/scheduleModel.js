function ScheduleModel (newAttributes) {
	var _ = require('../../client/js/lib/underscore.js'),
		attributes = {
			id: '',
			startDate: '',
			days: [],
		};
	
	setModel();

	function setModel () {
		_.each(attributes, function (value, key) {
			var isValidated = validateField(value, key);

			if (isValidated) {
				attributes[key] = newAttributes[key]
			}

		});
	}

	function validateField (value, key) {
		if (attributes[key] !== undefined) {
			return true;
		}
	}

	this.toJSON = function () {
		return _.clone(attributes);
	} 

	return this;
};

module.exports = ScheduleModel;