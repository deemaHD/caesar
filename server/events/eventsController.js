function EventsController (req, res) {
	var view = require('./eventsView'),
		Event = require('./eventsModel').EventsModel,
		db = new require('../db/db')(),
		eventsView = new view.EventsView(),
		actions = {
			'GET': get,
			'POST': create,
			'PUT': update,
			'DELETE': del
		},
		dbName = 'events',
		id = req.params.id;

	handle();

	function handle () {
		var event = new Event(req.body);

		actions[req.method](event);
	}

	function get (event) {
		db.fetch(dbName, responde);			
	}

	function create (event) {
		console.log(event.toJSON());
		db.create(dbName, event.toJSON(), responde);
	}	

	function update (event) {
		db.update(dbName, event.toJSON(), id, responde);
	}

	function del (event) {
		db.remove(dbName, id, responde);
	};

	function responde (err, dbQuery) {	
		res.send(eventsView.returnEvents(dbQuery, req));
	}

	return this;
}

module.exports = EventsController;