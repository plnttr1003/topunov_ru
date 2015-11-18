$(window).load(function(){

// -- управление цилиндром

	var $block = $('.cylinder_block');
	var blockPath = 'images/_0010000';
	var viewerPath = 'images/st';
	var panN = 0;


	var divide = $('body').width() / 100;
	$(window).mousemove(function(e) {
		var num = (Math.ceil(e.pageX / divide) / 5).toFixed();
		$block.css({'background-image':'url(' + blockPath + num + '.png)'});
	})

// -- кнопки

	var $menuInfo = $('.menu_item.info_item');
	var $menuPanorama = $('.menu_item.panorama_item');
	var $menuContacts = $('.menu_item.contacts_item');
	var $closeOverlay = $('.cross');
	var $overlayBlock = $('.overlay_block');
	var $panoramaCylinder = $('.panorama_cylinder');
	var $panoramaViewer = $('.panorama_viewer')
	var pageLocation;
	var layer;


// -- универсальное открытие скрытых слоев


	var openLayer = function openLayer(layer) {
		console.log('.' + layer + '_block');
		$('.' + layer + '_block').css({'visibility':'visible','opacity':'1','z-index':'10'});
		$closeOverlay.css({'visibility':'visible','opacity':'1','z-index':'12'});
		history.pushState({pageUrl: layer }, null, '/' + layer + '')
	}


// -- закрытие скрытых слоев

	var closeOverlayClick = function closeOverlayClick() {
		$overlayBlock.css({'visibility':'hidden','opacity':'0','z-index':'-10'});
		$closeOverlay.css({'visibility':'hidden','opacity':'0','z-index':'-10'});
	}


// -- действия на меню и закрытие


	$menuInfo.on('click', openLayer('info'));
	$menuPanorama.on('click', openLayer('panorama'));
	$menuContacts.on('click', openLayer('contacts'));

	$closeOverlay.on('click', closeOverlayClick);


// -- получение адреса

	window.onpopstate = function(e) {
		if (!window.history.state) {
			closeOverlayClick();
		}
		else {
			console.log('2121: ' + window.history.state)
			pageLocation = window.history.state.pageUrl;
			openLayer(pageLocation);
		}
	}


	$panoramaCylinder.on('click', function() {
		panN = ($(this).index() + 1)
		$panoramaViewer.css({'background-image':'url(' + viewerPath + panN + '/st0011.png)'})
	})
});