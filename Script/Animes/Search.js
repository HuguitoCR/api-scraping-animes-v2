const axios = require('axios');
const cheerio = require('cheerio');

async function Search(id) {
	
	const url = `https://www.animefenix.com/animes?q=${id}`; 
	const result = await axios.get(url);
	const datos = cheerio.load(result.data);
	const results = [];

	datos('div.list-series article.serie-card').each(function() {
		const title = datos(this).find('a').attr('title');
		const id = datos(this).find('a').attr('href').split('https://www.animefenix.com/')[1];
		const imagen = datos(this).find('img').attr('src');
		results.push({ title, imagen, id });
	});
	return results; 
}


module.exports = Search;