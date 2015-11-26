function Mediator () {
	var subscriptions = {};

	this.subscribe = function (_event, _f) {
		var event = _event,
			f = _f;

		if (subscriptions[event]) {
			subscriptions[event].push(f);			
		} else {
			subscriptions[event] = [f];
		}	
	};

	this.unsubscribe = function (_event, _f) {
		var event = _event,
			f = _f,
			isSubscribed = subscriptions[event].indexOf(f) !== -1;

		if (isSubscribed) {
			subscriptions[event].splice(subscriptions[event].indexOf(f), 1)
		}
	};

	this.publish = function (_event, _data) {
		var event = _event,
			data = _data;

		if (subscriptions[event].length !== 0) {
			subscriptions[event].forEach(function (f) {
				f.call(undefined, data);
			});	
		}
	};

	return this;
}

module.exports = Mediator;