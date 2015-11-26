function ScheduleController (req, res) {
	var scheduleView = new require('./scheduleView')(),
		ScheduleWeek = require('./scheduleModel'),
		db = new require('../db/db')(),
		actions = {
			'GET': get,
			'POST': create,
			'PUT': update,
			'DELETE': del
		},
		dbName = 'weeks',
		id = req.params.id;

	handle();

	function handle () {
		actions[req.method]();
	}

	function get () {
		db.fetch(dbName, responde);			
	}

	function create () {
		var scheduleWeek = new ScheduleWeek(req.body);

		db.create(dbName, scheduleWeek.toJSON(), responde);
	}	

	function update () {
		var scheduleWeek = new ScheduleWeek(req.body);
		
		db.update(dbName, scheduleWeek.toJSON(), id, responde);
	}

	function del () {
		db.remove(dbName, id, responde);
	};

	function responde (err, dbQuery) {
		res.send(scheduleView.returnSchedule(dbQuery));
	}

	return this;
}

module.exports = ScheduleController;