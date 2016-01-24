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
	var $panoramaControl = $('.panorama_control');
	var $panoramaViewer = $('.panorama_viewer');
	var $block = $('.cylinder_block');
	var pageLocation;
	var layer;
	var clone = false;
	var num = 0;
	var $panoramaNavigatorInnerAppend = $('.panorama_navigator_inner')

// -- управление цилиндром
	var blockPath = 'images/st';
	var folN = 0;
	var ePageX = 0;

	var cylinderChange = function cylynderChange(e, $targetElement) {
		if($(e.target).is($panoramaViewer)) {
			var divide = $panoramaViewer.width() / 100;
			var num = ((Math.ceil((e.pageX - $panoramaViewer.offset().left) / divide) / 5) + 1).toFixed();
			$panoramaViewer.css({'background-image':'url(' + blockPath + folN + '/st' + num + '.png)'});
		}
		else {
			var divide = $('body').width() / 100;
			var num = ((Math.ceil(e.pageX / divide) / 5) + 1).toFixed();
			$block.css({'background-image':'url(' + blockPath + 0 + '/st' + num + '.png)'});
		}
	}

	var panoramaMove = function panoramaMove(e) {
		var $panoramaNavigator = $('.panorama_navigator');
		var $panoramaNavigatorInner = $('.panorama_navigator_inner')

		if($(e.target).is($panoramaControl)) {
			var divide = $panoramaNavigator.width() / 100;
			if(ePageX > e.pageX) {
				console.log(parseInt(((((Math.abs(e.pageX / divide) + 10) / 5))).toFixed()));
				num -= parseInt(((((Math.abs(e.pageX / divide) + 50) / 5))).toFixed())
				if (num < 0) {
					console.log('21');
					$panoramaNavigator.prepend($panoramaNavigatorInner);
				}
			}
			else if ((ePageX < e.pageX)) {
				//console.log(ePageX + '  ' + e.pageX);
				console.log(parseInt(((((Math.abs(e.pageX / divide) + 10) / 5))).toFixed()));
				num += parseInt(((((Math.abs(e.pageX / divide) + 50) / 5))).toFixed());
				if (num > 0) {console.log('00')};
				//$panoramaNavigatorInnerAppend.css({'left':})
			}
			ePageX = e.pageX;
			console.log(num);
			$panoramaNavigator.scrollLeft(num);
		}
	}

	$(window).mousemove(function(e) {
		var divide = $('body').width() / 100;
		var folN = 0;
		cylinderChange(e, $block);
		panoramaMove(e);
	});

	$panoramaCylinder.on('click', function() {
		folN = ($(this).index() + 1)
		var num = 10;
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
		$overlayBlock.css({'visibility':'hidden','opacity':'0','z-index':'-10'});
		$closeOverlay.css({'visibility':'hidden','opacity':'0','z-index':'-10'});
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