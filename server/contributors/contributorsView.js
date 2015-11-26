function ContributorsView () {
	
	this.returnContributors = function (contributors) {
		return JSON.stringify(contributors);
	}

	return this;
}

module.exports = ContributorsView;