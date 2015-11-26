function ContributorsController (req, res) {
	var contributorsView = new require('./contributorsView')(),
		db = new require('../db/db')(),
		actions = {
			'GET': get,
			'POST': create,
			'PUT': update,
			'DELETE': del
		},
		dbName = 'contributors',
		id = req.params.id;

	handle();

	function handle () {
		actions[req.method]();
	}

	function get () {
		db.fetch(dbName, responde);			
	}

	function create () {
		res.send('This operation is not available for Contributors');
	}	

	function update () {
		res.send('This operation is not available for Contributors');
	}

	function del () {
		res.send('This operation is not available for Contributors');
	};

	function responde (err, dbQuery) {
		res.send(contributorsView.returnContributors(dbQuery));
	}

	return this;
}

module.exports = ContributorsController;