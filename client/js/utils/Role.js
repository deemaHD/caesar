var User = (function() {
	var role,
	    setRole = 'coordinator';
		
	start();
	
	function start () {
	    $.ajax({
	    type: "GET",
	    dataType: "json",
	    url: "/name",
	    success: function(data){
			role = data;
			if(role.role === 'Coordinator'){
				localStorage.setItem('manRole', 'coordinator');
			}
          }
	    });	
	}
	
return {
	get: function () {
		return _.clone(role);
	},
	
	role: function () {
	   return setRole;	
	},
	
	set: function (attr) {
		setRole = attr;
	},

	update: function () {
		start();
	}

};
})();
