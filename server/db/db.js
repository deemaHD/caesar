function DataBase () {
	var ObjectID = require('mongodb').ObjectID,
		MongoClient = require('mongodb').MongoClient,
		url = 'mongodb://127.0.0.1/caesar',
		async = require('async');

	this.fetch = function (collectionName, cb) {
		MongoClient.connect(url, function(err, db) {
		 	var collection = db.collection(collectionName);
		
		 	collection.find({}).toArray(function (err, result) {
		 		cb(err, result);

		 		db.close();
		 	});
		});
	};

	this.create = function (collectionName, attributes, cb) {
		MongoClient.connect(url, function(err, db) {
		 	var notes = db.collection(collectionName);

		    getNextSequence(collectionName + 'Id', saveWithNewId);
			
		 	function getNextSequence(name, cb) {
   				db.collection('counters').findAndModify(
        			{ _id: name },
        			[],
        			{ $inc: { seq: 1 } },
        			{new: true},
        			function (err, res) {
        				if (err) {
        					console.log(err.message);
        				} else {
        					attributes['id'] = res.value.seq;

        					cb(attributes);
        				}
        			}
          		);
			}

		    function saveWithNewId (attributes) {
			 	notes.insert(attributes, function (err, result) {
			 			cb(err, result.ops[0]);
			 		
			 		db.close();
			 	});
		    }
		});
	};	

	this.update = function (collectionName, attributes, id, cb) {
		MongoClient.connect(url, function(err, db) {
		 	var collection = db.collection(collectionName);

		 	collection.findAndModify(
    			{ id: Number(id) },
    			[],
    			{ $set: attributes },
    			{new: true},
    			function (err, result) {
			 		cb(err, result.value);

		 			db.close();
    			}
          	);
		});
	};

	this.remove = function (collectionName, id, cb) {
		MongoClient.connect(url, function(err, db) {
		 	var collection = db.collection(collectionName);
	 	
		 	collection.remove({id: Number(id)}, function (err, result) {	 		
		 		cb(err, result.result);

		 		db.close();
		 	});
		});
	};

	this.findUser = function (login, password, cb) {
		MongoClient.connect(url, function(err, db) {
		 	var collection = db.collection('accounts');
		
		 	collection.findOne({login: login, password: password}, function (err, result) {
		 		cb(err, result);
		 		db.close();
		 	});
		});
	};

	this.findUserByLogin = function (login, cb) {
		MongoClient.connect(url, function(err, db) {
			var collection = db.collection('accounts');

			collection.findOne({login: login}, function (err, result) {
				cb(err, result);
				db.close();
			});
		});
	};

	this.reset = function (defaults, cb) {
		MongoClient.connect(url, function(err, db) {
		 	var resetsCount = 0,
		 		collectionsCount = Object.keys(defaults).length,
		 		key;

		 	if (err) {
		 		return cb(err);
		 	}

		 	async.series([
				clearCollections,
				setDefaults
			], cb)

			function clearCollections (callback) {
				async.each(
					Object.keys(defaults), 
					function (collectionName, callback) {
						db.collection(collectionName).remove({}, callback);
					}, 
					callback
				)
			}

			function setDefaults (callback) {
				async.each(
					Object.keys(defaults), 
					function (collectionName, callback) {
						var currentDefaults = defaults[collectionName];

						db.collection(collectionName).insert(currentDefaults, callback);
					}, 
					callback
				)
			}
		});
	};




	return this;
}

module.exports = DataBase;