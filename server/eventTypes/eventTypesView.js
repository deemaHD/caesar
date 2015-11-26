function EventTypesView () {
	
	this.returnEventTypes = function (eventTypes) {
		return JSON.stringify(eventTypes);
	}

	return this;
}

module.exports = EventTypesView;