templates.conflictsInCellsViewTpl = _.template([
'	<div class="myPanel myPanel-danger">',
'   	<div class="myPanel-heading">',
'			Conflicts are found on:',
'		</div>',
'   	<div class="myPanel-body">',
'				<%= value%>',
'		</div>',
' 	</div>'].join(''));