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

for (i=0; i < 20; i ++) {
	$.preLoadImages('images/_0010000' + i + '.png');
}
});