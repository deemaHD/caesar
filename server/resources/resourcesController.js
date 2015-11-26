function ResourcesController (req, res) {
	var resourcesView = new require('./resourcesView')(),
		Resource = require('./resourcesModel'),
		db = new require('../db/db')(),
		actions = {
			'GET': get,
			'POST': create,
			'PUT': update,
			'DELETE': del
		},
		dbName = 'resources',
		id = req.params.id;

	handle();

	function handle () {
		var resource = new Resource(req.body);

		actions[req.method](resource);
	}

	function get (resource) {
		db.fetch(dbName, responde);			
	}

	function create (resource) {
		db.create(dbName, resource.toJSON(), responde);
	}	

	function update (resource) {
		db.update(dbName, resource.toJSON(), id, responde);
	}

	function del (resource) {
		db.remove(dbName, id, responde);
	};

	function responde (err, dbQuery) {
		res.send(resourcesView.returnResources(dbQuery, req));
	}

	return this;
}

module.exports = ResourcesController;