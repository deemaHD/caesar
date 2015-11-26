function EventsController (req, res) {
    var archiver = require('archiver'),
        path = require('path'),
        fs = require('fs'),
        archive = archiver('zip'),
        db = new require('../db/db')(),
        dirname = './CalendarApplication',
        _ = require('underscore-node');
    
	handle();

	function handle () {
        createFiles();
	}
    
    function createFiles () {
        var locationCityId = Number(req.query.location);
        
        db.fetch('weeks', function (err, collection) {
            if (err) throw err;
            var tpl = _.template("var scheduleCollection = <%= array %>;"),
                data = tpl({array : JSON.stringify(collection)});
            
            fs.writeFileSync(dirname + '/weeks.js', data);
        });
        
        db.fetch('events', function (err, collection) {
            if (err) throw err;
            var tpl = _.template("var eventsCollection = <%= array %>;"),
                events = [],
                data = '';

            _.each(collection, function (event) {
                if (event.locationCity === locationCityId) {
                    events.push(event);
                }
            });
            
            data = tpl({array : JSON.stringify(events)});
            
            fs.writeFileSync(dirname + '/events.js', data);
        });
        
        db.fetch('resources', function (err, collection) {
            if (err) throw err;
            var tpl = _.template("var resourcesCollection = <%= array %>;"),
                data = tpl({array : JSON.stringify(collection)});
            
            fs.writeFileSync(dirname + '/resources.js', data);
            archivate();
        });
    }

	function archivate () {
        console.log('archive');
        archive.on('error', function(err) {
            res.status(500).send({error: err.message});
        });

        res.attachment('calendar.zip');

        archive.pipe(res);
        
        walk(dirname, function(filePath, stat) {
            archive.append(fs.createReadStream(filePath), { name: filePath });
        });
        
        archive.finalize();
	}
    
    function walk (currentDirPath, callback) {
        fs.readdirSync(currentDirPath).forEach(function(name) {
            var filePath = path.join(currentDirPath, name);
            var stat = fs.statSync(filePath);
            if (stat.isFile()) {
                callback(filePath, stat);
            } else if (stat.isDirectory()) {
                walk(filePath, callback);
            }
        });
    }

	return this;
}

module.exports = EventsController;