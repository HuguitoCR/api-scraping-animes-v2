const axios = require('axios');
const cheerio = require('cheerio');

const MoreInfo = async(Anime) => {
	const url = `https://www.animefenix.com/${Anime}`;
	const repuesta = await axios.get(url);
	const datos = cheerio.load(repuesta.data);
	const info = [];
	const episodes = [];


	datos('div.columns.is-mobile.is-multiline').is(function() {
		const img = datos(this).find('img').attr('src');
		const estado = datos(this).find('ul.has-text-light').text().split('\n')[2].split(':')[1].replace(' ', '');
		let siguienteEpisodio;
		try {
			siguienteEpisodio = datos(this).find('ul.has-text-light').children('li').children('span.has-text-orange').parent().text().split(':')[1].trim();
		}
		catch {
			siguienteEpisodio = null;
		}
		const titulo = datos(this).find('h1.title').text();
		const sinopsis = datos(this).find('p.sinopsis').text().replace(/\n/g, '');
		const generos = datos(this).find('a.button.is-small').text().replace('Á', 'A').replace('Fic', 'fic').split(/(?=[A-Z])/).toString().replace('Ang', 'Áng').replace('fic', 'Fic').split(',');
		const tipo = datos(this).find('ul.has-text-light').text().split('\n')[1].split(':')[1].trimStart();
		const totalEpisodios = datos(this).find('ul.has-text-light').text().split('\n')[3].split(':')[1].trimStart();
		info.push({ img, tipo, estado, totalEpisodios, siguienteEpisodio, titulo, sinopsis, generos });
	});

	datos('ul.anime-page__episode-list li').each(function() {
		const episodio = parseInt(datos(this).find('a').children('span').text().split(' ')[1]);
		const link = datos(this).find('a').attr('href').split('https://www.animefenix.com/ver/')[1];
		episodes.push({ episodio, link });
	});

	return result = { info, episodes };
};

module.exports = MoreInfo;