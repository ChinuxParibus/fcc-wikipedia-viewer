var $ = require('minified').$;

$(function () {
	var tplPosts = '{{each}}<div class="card notification is-dark has-text-right"><a href="{{this[2]}}"><div class="card-content"><h1 class="title">{{this[0]}}</h1><p>{{this[1]}}</p></div></a></div></a>{{/each}}';
	$('.input').set('value', '');
	$('.help').hide();

	$('#search').onClick(function (){
		var search = $('.input').get('value');
		if (!search) {
			$('.input').set('+is-danger');
			$('.help').fill('Oh, c\'mon... write something to search! 😒');
			$('.help').set('+is-danger')
			.animate({'$$show': 1}, 2000).then(function () {
				$('.help').hide();
				$('.input').set('-is-danger');
			});
		} else {
			var urlSearch = 'https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&search='+encodeURI(search);
			$.request('GET', urlSearch).then(function (text) {
				var data = $.parseJSON(text);
				data = data.splice(1, 4);
				posts = data[0].map(function (item, index) {
					return [item, data[1][index], data[2][index]];
				});
				$('#search').set('+is-loading');
				$.wait(2000).then(function () {
					$('#list').ht(tplPosts, posts);
					$('#search').set('-is-loading');
				});

				return true;
			}).error(function () {
				$('.input').set('+is-danger');
				$('.help').fill('Oops! Something goes wrong with the request... 😱');
				$('.help').set('+is-danger')
				.animate({'$$show': 1}, 2000).then(function () {
					$('.help').hide();
					$('.input').set('-is-danger');
				});
			});
		}
	});
});