function CountriesController (req, res) {
	var countriesView = new require('./countriesView')(),
		Country = require('./countriesModel'),
		db = new require('../db/db')(),
		actions = {
			'GET': get,
			'POST': create,
			'PUT': update,
			'DELETE': del
		},
		dbName = 'countries',
		id = req.params.id;

	handle();

	function handle () {
		actions[req.method]();
	}

	function get () {
		db.fetch(dbName, responde);			
	}

	function create () {
		var country = new Country(req.body);

		db.create(dbName, country.toJSON(), responde);
	}	

	function update () {
		var country = new Country(req.body);
		
		db.update(dbName, country.toJSON(), id, responde);
	}

	function del () {
		db.remove(dbName, id, responde);
	};

	function responde (err, dbQuery) {
		res.send(countriesView.returnCountry(dbQuery));
	}

	return this;
}

module.exports = CountriesController;