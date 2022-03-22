const axios = require('axios');
const cheerio = require('cheerio');

const Reviews = async() => {
	const url = 'https://somoskudasai.com/';
	const result = await axios.get(url);	
	const $ = cheerio.load(result.data);
	const noticias = [];
	
	$('.ar-reviews .swiper-slide').each((i, elem) => {
		const noticia = {
			titulo: $(elem).find('a').attr('aria-label'),
			url: $(elem).find('a').attr('href'),
			img: $(elem).find('img').attr('src'),
		};
	noticias.push(noticia);
	});

	return noticias;		
}

module.exports = Reviews;