$(document).ready(function(){
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
});