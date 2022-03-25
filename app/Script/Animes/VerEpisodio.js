const axios = require('axios');
const cheerio = require('cheerio');


const VerEpisodio = async (id, res) => {
	const lista =[];
	
	const u = `https://www.animefenix.com/ver/${id}`;
	const response = await axios(u);
	const $ = cheerio.load(response.data);

	const Id = $('.column .is-6-desktop').find('a').attr('href').split('https://www.animefenix.com/')[1];

	const Nombre = $('ul.episode-page__servers-list > li').toArray().map((element) => $(element).text().trim());
	const URL = $('.player-container').find('script').html().match(/(?<=src=["'])([^"'])*/gm);

	
	Nombre.forEach(async(element, index) => {
		const data = await axios(URL[index].replace('amp;', ''));
		const $$ = cheerio.load(data.data);
		const livideo = $$('script').html().match(/(?<=src=["'])([^"'])*/gm).map(it => {
			return it.replace('..', '').replace('/stream/amz.php?', 'https://www.animefenix.com/stream/amz.php').replace('/stream/fl.php?v=https://', 'https://www.animefenix.com/redirect.php?player=22&code=');
		});
		
		lista.push({name: element, url: livideo[0] });
		if (lista.length == Nombre.length) {
			lista.map(it => {
				if (it.name == 'M') it.name = 'Mega';
				return it;
			});
			res.json({ Id, lista });
		}
		
	});
};
module.exports = VerEpisodio;