const axios = require('axios');
const cheerio = require('cheerio');

const Reviews = async() => {
	const html = await axios('https://somoskudasai.com/');
	const $ = cheerio.load(html.data);
	const noticias = [];
	
	$('.ar-reviews .swiper-slide').each(function() {
		const noticia = {
			titulo: $(this).find('a').attr('aria-label'),
			url: $(this).find('a').attr('href'),
			img: $(this).find('img').attr('src'),
		};
		noticias.push(noticia);
	});

	return noticias;
};

module.exports = Reviews;