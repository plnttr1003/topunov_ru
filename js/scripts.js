$(window).load(function(){

	var cache = [];
	$.preLoadImages = function() {
		var args_len = arguments.length;
		for (var i = args_len; i--;) {
			var cacheImage = document.createElement('img');
			cacheImage.src = arguments[i];
			cache.push(cacheImage);
		}
	}

	for (i=1; i < 22; i ++) {
		$.preLoadImages('images/st0/st' + i + '.png');
	}
	$.preLoadImages('images/panorama.jpg');

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

	var cylinderChange = function cylynderChange(e, $targetElement) {
		if($(e.target).is($panoramaViewer)) {
			var divide = $panoramaViewer.width() / 100;
			var num = ((Math.ceil((e.pageX - $panoramaViewer.offset().left) / divide) / 5) + 1).toFixed();
			console.log(num);
			$panoramaViewer.css({'background-image':'url(' + blockPath + folN + '/st' + num + '.png)'});
		}
		else {
			var divide = $('body').width() / 100;
			var num = ((Math.ceil(e.pageX / divide) / 5) + 1).toFixed();
			$block.css({'background-image':'url(' + blockPath + 0 + '/st' + num + '.png)'});
		}
	}


	$(window).mousemove(function(e) {
		var divide = $('body').width() / 100;
		var folN = 0;
		cylinderChange(e, $block);
	})


	$panoramaCylinder.on('click', function() {
		folN = ($(this).index() + 1)
		num = 10;
		$panoramaViewer.css({'background-image':'url(' + blockPath + folN + '/st' + num + '.png)'});
		for (i=1; i < 22; i ++) {
			$.preLoadImages('images/st' + folN + '/st' + i + '.png');
		}
	})


	// -- открытие скрытых слоев
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

});