function CitiesController (req, res) {
	var citiesView = new require('./citiesView')(),
		City = require('./citiesModel'),
		db = new require('../db/db')(),
		actions = {
			'GET': get,
			'POST': create,
			'PUT': update,
			'DELETE': del
		},
		dbName = 'cities',
		id = req.params.id;

	handle();

	function handle () {
		actions[req.method]();
	}

	function get () {
		db.fetch(dbName, responde);			
	}

	function create () {
		var city = new City(req.body);

		db.create(dbName, city.toJSON(), responde);
	}	

	function update () {
		var city = City(req.body);
		
		db.update(dbName, city.toJSON(), id, responde);
	}

	function del () {
		db.remove(dbName, id, responde);
	};

	function responde (err, dbQuery) {	
		res.send(citiesView.returnCity(dbQuery));
	}

	return this;
}

module.exports = CitiesController;