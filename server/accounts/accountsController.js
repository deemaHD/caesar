function AccountsController (req, res) {
	var accountsView = new require('./accountsView')(),
		Account = require('./AccountsModel'),
		db = new require('../db/db')(),
		actions = {
			'GET': get,
			'POST': checkRole(create),
			'PUT': update,
			'DELETE': checkRole(del)
		},
		dbName = 'accounts',
		id = req.params.id;

	handle();

	function handle () {
		actions[req.method]();
	}

	function get () {
		db.fetch(dbName, responde);			
	}

	function create () {
		var account = new Account(req.body);

		db.findUserByLogin( req.body.login , function (err, result) {
			if (!result) {
				db.create(dbName, account.toJSON(), responde);
			} else {
				res.status(200).send(false);
			}
		});
	}	

	function update () {
		var account = new Account(req.body),
            cookie = globalMan[req.cookies.clientId];
		console.log(req.body);
        
        if (cookie !== undefined && cookie.role === 'Admin') {
            db.update(dbName, account.toJSON(), id, responde);
        } else {
            var updateData = {
                    password: account.toJSON().password
                };
            db.update(dbName, updateData, id, responde);
        }
		
	}

	function del () {
		db.remove(dbName, id, responde);
	}

	function responde (err, dbQuery) {	
		res.send(accountsView.returnAccount(dbQuery, req));
	}

	function checkRole (method) {
		var cookie = globalMan[req.cookies.clientId];

		return (cookie !== undefined && cookie.role === "Admin")? method: get;
	}

	return this;
}

module.exports = AccountsController;