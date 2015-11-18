$(window).load(function(){

	var $menuItem = $('.menu_item');

	var $closeOverlay = $('.cross');
	var $overlayBlock = $('.overlay_block');
	var $panoramaCylinder = $('.panorama_cylinder');
	var $panoramaViewer = $('.panorama_viewer')
	var $block = $('.cylinder_block');

	var pageLocation;
	var layer;


// -- управление цилиндром


	var blockPath = 'images/st';
	var folN = 0; // номер папки

	var divide = $('body').width() / 100;
	$(window).mousemove(function(e) {
		var num = ((Math.ceil(e.pageX / divide) / 5) + 1).toFixed();
		$block.css({'background-image':'url(' + blockPath + folN + '/st' + num + '.png)'});
	})




// -- универсальное открытие скрытых слоев

	var openLayer = function openLayer(layer, push) {
		$('.' + layer + '_block').css({'visibility':'visible','opacity':'1','z-index':'10'});
		$closeOverlay.css({'visibility':'visible','opacity':'1','z-index':'12'});
		if (push === true) {
			history.pushState({pageUrl: layer }, null, '/' + layer + '')
		}
	}


// -- закрытие скрытых слоев

	var closeOverlayClick = function closeOverlayClick() {
		$($overlayBlock, $closeOverlay).css({'visibility':'hidden','opacity':'0','z-index':'-10'});
		history.pushState({pageUrl: null }, null, '/');
	}


// -- действия на меню и закрытие

	$menuItem.on('click', function(e) {openLayer($(this).attr('id'), true);});
	$closeOverlay.on('click', closeOverlayClick);


// -- получение адреса

	window.onpopstate = function(e) {
		if (!window.history.state) {
			closeOverlayClick();
		}
		else {
			pageLocation = window.history.state.pageUrl;
			pageLocation !== null ? openLayer(pageLocation, false) : closeOverlayClick();
		}
	}


	$panoramaCylinder.on('click', function() {
		folN = ($(this).index() + 1)
		num = 10;
		$panoramaViewer.css({'background-image':'url(' + blockPath + folN + '/st' + num + '.png)'});
	})
});