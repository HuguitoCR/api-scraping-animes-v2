const axios = require('axios');
const cheerio = require('cheerio');

const MasNoticias = async() => {
	const url = 'https://somoskudasai.com/';
	const result = await axios.get(url);
	const $ = cheerio.load(result.data);
	const noticias = [];
	
	$('div.dg.gt1 article.ar.lg.por').each((i, elem) => {
		const noticia = {
			titulo: $(elem).find('a').attr('aria-label'),
			url: $(elem).find('a').attr('href'),
			imagen: $(elem).find('img').attr('src'),
		};
		noticias.push(noticia);
	});			

	return noticias;	
}

module.exports = MasNoticias;