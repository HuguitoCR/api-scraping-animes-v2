const { getHtml } = require('../../helpers');

const Reviews = async(res) => {
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

	res.json({ noticias });
};

module.exports = Reviews;