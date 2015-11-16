$(window).load(function(){

	var $block = $('.cylinder_block');
	var blockPath = 'images/_0010000';


	var divide = $('body').width() / 100;
	$(window).mousemove(function(e) {
		var num = (Math.ceil(e.pageX / divide) / 5).toFixed();
		$block.css({'background-image':'url(' + blockPath + num + '.png)'});
	})

	var $menuInfo = $('.menu_item.info_item');
	var $menuContacts = $('.menu_item.contacts_item');
	var $closeOverlay = $('.cross');
	var $overlayBlock = $('.overlay_block');

	var menuInfoClick = function() {
		$('.info_block').css({'visibility':'visible','opacity':'1','z-index':'10'});
		$closeOverlay.css({'visibility':'visible','opacity':'1','z-index':'12'});
	}

	var menuContactsClick = function() {
		$('.contacts_block').css({'visibility':'visible','opacity':'1','z-index':'10'});
		$closeOverlay.css({'visibility':'visible','opacity':'1','z-index':'12'});
	}

	var closeOverlayClick = function() {
		$overlayBlock.css({'visibility':'hidden','opacity':'0','z-index':'-10'});
		$closeOverlay.css({'visibility':'hidden','opacity':'0','z-index':'-10'});
	}

	$menuInfo.on('click', menuInfoClick);
	$menuContacts.on('click', menuContactsClick);
	$closeOverlay.on('click', closeOverlayClick);
});