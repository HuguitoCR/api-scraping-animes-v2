const { getHtml } = require('../../helpers');

const watchEpisode = async (id, res) => {
	const $ = await getHtml(`https://www.animefenix.com/ver/${id}`);
	const episodeURL = [];
	console.log('Watching episodeURL');
	const animeId = $('.column .is-6-desktop').find('a').attr('href').split('https://www.animefenix.tv/')[1];
	const servers = $('ul.episode-page__servers-list > li').toArray().map((element) => $(element).text().trim());
	const serverURL = $('.player-container').find('script').html().match(/(?<=src=["'])([^"'])*/gm);

	servers.forEach(async (element, index) => {
		const $$ = await getHtml(serverURL[index].replace('amp;', ''));
		const videoLink = $$('script').html().match(/(?<=src=["'])([^"'])*/gm).map(it => {
			return it.replace('..', '').replace('/stream/amz.php?', 'https://www.animefenix.tv/stream/amz.php')
				.replace('/stream/fl.php?v=https://', 'https://www.animefenix.tv/redirect.php?player=22&code=');
		});

		if (element == 'M') {
			element = 'Mega';
		}
		episodeURL.push({ server: element, url: videoLink[0] });

		if (episodeURL.length == servers.length) {
			return res.json({ anime_id: animeId, episode_URL: episodeURL });
		}
	});
};
module.exports = watchEpisode;