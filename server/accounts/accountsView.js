function AccountsView () {
	this.returnAccount = function (account, req) {
		if (globalMan[req.cookies.clientId] !== undefined) {
			if(globalMan[req.cookies.clientId].role !== "Admin") {
				account = [];
			}
			return JSON.stringify(account);
		}
	};
	
	return this;
}
module.exports = AccountsView;