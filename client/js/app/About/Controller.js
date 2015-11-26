'use strict';

(function (This)  {
    This.Controller = function () {
        var $service = $('#main'),
            view;

        start();

        function start () {
            cs.mediator.subscribe('ShowAbout', showAbout);

            view = new This.GroupCollectionView();

            $service.append(view.render().el);
			
			var sortable;
			// первый аргумент - функция
			function dragNdrop() {
			  	var el = document.getElementById('testim');
		
                sortable = Sortable.create(el, {animation: 150 });
			}
			setTimeout(dragNdrop, 1000);
        }

        function showAbout () {
            hideAll();

			$(".a4").show();
			$(".a6").show();
			$('.contributors-names-container').removeClass('zoomOutDown');
			
			function second_passed() {
			    $('.a4').addClass('zoomOutUp');
				$('.a6').addClass('zoomOutUp');
			}
			setTimeout(second_passed, 30000);
				
			function second_passed1() {
			    $(".a4").hide().removeClass('zoomOutUp');
				$(".a6").hide().removeClass('zoomOutUp');
			}
			setTimeout(second_passed1, 31000);
			
            view.show();
        }

        function hideAll () {
            $service.children().addClass('hidden');
        }

        return this;
    }
})(App.About);