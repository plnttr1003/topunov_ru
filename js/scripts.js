$(window).load(function(){

// -- управление цилиндром

	var $block = $('.cylinder_block');
	var blockPath = 'images/_0010000';


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
	var pageLocation;
	var ppp = 0;


// -- универсальное открытие скрытых слоев


	var openLayer = function openLayer(layer) {
		$('.' + layer + '_block').css({'visibility':'visible','opacity':'1','z-index':'10'});
		$closeOverlay.css({'visibility':'visible','opacity':'1','z-index':'12'});
		history.pushState({pageUrl: layer }, null, '/' + layer + '')
	}

// -- закрытие скрытых слоев

	var closeOverlayClick = function closeOverlayClick() {
		$overlayBlock.css({'visibility':'hidden','opacity':'0','z-index':'-10'});
		$closeOverlay.css({'visibility':'hidden','opacity':'0','z-index':'-10'});
	}

// -- получение адреса

	window.onpopstate = function(e) {
		if (!window.history.state) {
			console.log(closeOverlayClick);
			closeOverlayClick();
		}
		else {
			pageLocation = window.history.state.pageUrl;
			openLayer(pageLocation);
		}
	}



// -- открытие скрытых слоев

	var menuInfoClick = function menuInfoClick() {
		$('.info_block').css({'visibility':'visible','opacity':'1','z-index':'10'});
		$closeOverlay.css({'visibility':'visible','opacity':'1','z-index':'12'});
		history.pushState({pageUrl:'info'}, 'ИНФОРМАЦИЯ', '/info')
	}

	var menuPanoramaClick = function menuPanoramaClick() {
		$('.panorama_block').css({'visibility':'visible','opacity':'1','z-index':'10'});
		$closeOverlay.css({'visibility':'visible','opacity':'1','z-index':'12'});
		history.pushState({pageUrl:'panorama'}, 'Панорама выставки', '/panorama')
	}

	var menuContactsClick = function menuContactsClick() {
		$('.contacts_block').css({'visibility':'visible','opacity':'1','z-index':'10'});
		$closeOverlay.css({'visibility':'visible','opacity':'1','z-index':'12'});
		history.pushState({pageUrl:'contacts'}, 'Контакты', '/contacts')
	}



	$menuInfo.on('click', menuInfoClick);
	$menuPanorama.on('click', menuPanoramaClick);
	$menuContacts.on('click', menuContactsClick);
	$closeOverlay.on('click', closeOverlayClick);
});