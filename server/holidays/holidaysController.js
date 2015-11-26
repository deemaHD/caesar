function HolidaysController (req, res) {
	var holidaysView = new require('./holidaysView')(),
		Holiday = require('./holidaysModel'),
		db = new require('../db/db')(),
		actions = {
			'GET': get,
			'POST': create,
			'PUT': update,
			'DELETE': del
		},
		dbName = 'holidays',
		id = req.params.id;

	handle();

	function handle () {
		var holiday = new Holiday(req.body);

		actions[req.method](holiday);
	}

	function get () {
		db.fetch(dbName, responde);			
	}

	function create (holiday) {
		db.create(dbName, holiday.toJSON(), responde);
	}	

	function update (holiday) {
		db.update(dbName, holiday.toJSON(), id, responde);
	}

	function del () {
		db.remove(dbName, id, responde);
	};

	function responde (err, dbQuery) {
		res.send(holidaysView.returnHolidays(dbQuery, req));
	}

	return this;
}

module.exports = HolidaysController;