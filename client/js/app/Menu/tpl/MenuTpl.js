'use strict';
templates.menuTpl = _.template([
  '<div class="navbar-header">',
        '<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">',
            '<span class="sr-only">Toggle navigation</span>',
            '<span class="icon-bar"></span>',
            '<span class="icon-bar"></span>',
            '<span class="icon-bar"></span>',
        '</button>',
		
    '</div>',

    '<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">',
        '<ul class="nav navbar-nav">',
            '<li role="presentation" class="schedule menu-item forAdmin">',
			    '<span class="glyphicon glyphicon-calendar"></span></br>',
			    'Schedule',
		    '</li>',
			'<li role="presentation" class="events menu-item forAdmin">',
				'<span class="glyphicon glyphicon-flag"></span></br>',
				'Events',
			'</li>',
			'<li role="presentation" class="resources menu-item forAdmin">',
				'<span class="glyphicon glyphicon-tasks"></span></br>',
				'Resources',
			'</li>',
			'<%if(name.role === "Admin"){%>',
				'<li role="presentation" class="settings menu-item onlyAdmin">',
					'<span class="glyphicon glyphicon-cog"></span></br>',    
					'Settings',
				'</li>',
				'<li role="presentation" class="accounts menu-item onlyAdmin">',
					'<span class="glyphicon glyphicon-user"></span></br>',    
					'Accounts',
				'</li>',
				'<%}%>',
				'<li role="presentation" class="holidays menu-item">',
					'<span class="glyphicon glyphicon-plane"></span></br>',    
					'Holidays',
				'</li>',
                '<li role="presentation" class="contributors menu-item">',
                    '<span class="glyphicon glyphicon-piggy-bank"></span></br>',
                    'Contributors',
                '</li>',
        '</ul>',
        '<ul class="nav navbar-nav navbar-right">',
            '<%if(name.role === "Admin"){%>',
                '<li role="presentation" class="myChek menu-item">',
                    '<span class="glyphicon glyphicon-random"></span></br>',    
                    '<span id="role">Coordinator</span>',
                '</li>',
            '<%}%>',
            '<li role="presentation" class="menu-item changePadding userSetting">',
                '<span class="glyphicon glyphicon-user"></span><br>',
                '<%= name.name + " " + name.lastName %>',
            '</li>',
            '<li role="presentation" class="menu-item exitMenu">',
                '<a class="changePadding exitLink" href="/logout">',
                      '<span class="glyphicon glyphicon-off"></span><br>',
                      'Log out',
                '</a>',
            '</li>',
        '</ul>',
    '</div>'
].join(''));