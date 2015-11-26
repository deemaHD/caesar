function ResourceTypesView () {
	
	this.returnResourceTypes = function (user) {
		return JSON.stringify(user);
	}

	return this;
}

module.exports = ResourceTypesView;