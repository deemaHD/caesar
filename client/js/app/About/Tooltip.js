'use strict';

(function (This) {

    This.Tooltip = (function () {

        return {
            show: function (model) {
                var wrapForModel = document.createElement('div'),
					changePositionByY = 30,
					changePositionByX = 40;

                wrapForModel.setAttribute('class', 'showFullInfo');
                document.body.appendChild(wrapForModel);
                wrapForModel.innerHTML = model;
    
                $(window).mousemove(function (pos) {
				    var	windowHeight = $(window).height(),
						windowWidth = $(window).width(),
						mousePositionByY = window.event.clientY,
						mousePositionByX = window.event.clientX;
						
					if(mousePositionByY <= 50) {
					    changePositionByY = (mousePositionByY - 15);
					} else if (mousePositionByY >= windowHeight - 100) {
						changePositionByY = (mousePositionByY + 135 - windowHeight);
					}
					
					if(windowWidth-mousePositionByX < 190) {
						changePositionByX = -180;
					}

                    $('.showFullInfo').css('left',(pos.pageX + changePositionByX) + 'px').css('top',(pos.pageY - changePositionByY) + 'px');
                });
            },

            hide: function () {
                $('.showFullInfo').remove();
            }
        };
    })();

})(App.About);