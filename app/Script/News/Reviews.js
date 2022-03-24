const { getHtml } = require('../../helpers');

const Reviews = async() => {
	const $ = await getHtml('https://somoskudasai.com/');
	const noticias = [];
	
	$('.ar-reviews .swiper-slide').each(function() {
		const noticia = {
			title: $(this).find('a').attr('aria-label'),
			url: $(this).find('a').attr('href'),
			img: $(this).find('img').attr('src'),
		};
		noticias.push(noticia);
	});

	return noticias;
};

module.exports = Reviews;