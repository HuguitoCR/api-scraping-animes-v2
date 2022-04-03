const { getHtml } = require('../../helpers');

const VerEpisodio = async (id, res) => {
	const $ = await getHtml(`https://www.animefenix.com/ver/${id}`);
	const lista =[];

	const anime_id = $('.column .is-6-desktop').find('a').attr('href').split('https://www.animefenix.com/')[1];
	const servers = $('ul.episode-page__servers-list > li').toArray().map((element) => $(element).text().trim());
	const serverURL = $('.player-container').find('script').html().match(/(?<=src=["'])([^"'])*/gm);

	servers.forEach(async(element, index) => {
		const $$ = await getHtml(serverURL[index].replace('amp;', ''));
		const livideo = $$('script').html().match(/(?<=src=["'])([^"'])*/gm).map(it => {
			return it.replace('..', '').replace('/stream/amz.php?', 'https://www.animefenix.com/stream/amz.php').replace('/stream/fl.php?v=https://', 'https://www.animefenix.com/redirect.php?player=22&code=');
		});
		
		lista.push({server: element, url: livideo[0] });
		if (lista.length == servers.length) {
			lista.map(it => {
				if (it.server == 'M') it.server = 'Mega';
				return it;
			});
			res.json({ anime_id, lista });
		}
	});
};
module.exports = VerEpisodio;