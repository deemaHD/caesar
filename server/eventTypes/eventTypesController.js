function EventTypesController (req, res) {
	var eventTypesView = new require('./eventTypesView')(),
		EventType = require('./eventTypesModel'),
		db = new require('../db/db')(),
		actions = {
			'GET': get,
			'POST': create,
			'PUT': update,
			'DELETE': del
		},
		dbName = 'eventTypes',
		id = req.params.id;

	handle();

	function handle () {
		actions[req.method]();
	}

	function get () {
		db.fetch(dbName, responde);			
	}

	function create () {
		var eventType = new EventType(req.body);

		db.create(dbName, eventType.toJSON(), responde);
	}	

	function update () {
		var eventType = new EventType(req.body);
		
		db.update(dbName, eventType.toJSON(), id, responde);
	}

	function del () {
		db.remove(dbName, id, responde);
	};

	function responde (err, dbQuery) {
		res.send(eventTypesView.returnEventTypes(dbQuery));
	}

	return this;
}

module.exports = EventTypesController;