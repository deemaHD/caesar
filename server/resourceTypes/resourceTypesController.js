function ResourceTypesController (req, res) {
	var resourceTypesView = new require('./resourceTypesView')(),
		ResourceType = require('./resourceTypesModel'),
		db = new require('../db/db')(),
		actions = {
			'GET': get,
			'POST': create,
			'PUT': update,
			'DELETE': del
		},
		dbName = 'resourceTypes',
		id = req.params.id;

	handle();

	function handle () {
		actions[req.method]();
	}

	function get () {
		db.fetch(dbName, responde);			
	}

	function create () {
		var resourceType = new ResourceType(req.body);

		db.create(dbName, resourceType.toJSON(), responde);
	}	

	function update () {
		var resourceType = new ResourceType(req.body);
		
		db.update(dbName, resourceType.toJSON(), id, responde);
	}

	function del () {
		db.remove(dbName, id, responde);
	};

	function responde (err, dbQuery) {
		res.send(resourceTypesView.returnResourceTypes(dbQuery));
	}

	return this;
}

module.exports = ResourceTypesController;