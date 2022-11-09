const { getHtml } = require('../../helpers');
const { redisClient } = require('../../lib');

const lastEpisodes = async (res) => {
	const reply = await redisClient.getKey('lastEpisodes');

	if (reply) {
		res.json({ episodes: JSON.parse(reply), source: 'cache' });
	} else {
		const $ = await getHtml('https://www.animefenix.tv/');
		const episodes = [];

		$('.capitulos-grid .item').each(function () {
			const $this = $(this);
			const animeEpisode = {
				id: $this.find('a').attr('href').split('https://www.animefenix.tv/')[1].split('/')[1],
				title: $this.find('div.overtitle').text().split('\n').join(''),
				img: $this.find('img').attr('src'),
				episode: $this.find('div.overepisode').text().split('\n').join(''),
				name_id: $this.find('div.overtitle').text().trim().replace(/[.:!?¡¿(),'"]/g, '').replace('=', '-').split(' ').join('-').toLowerCase().split(' ').join('').split('θ').join('-theta').split('---').join('-').split('--').join('-').split('story-').join('story').split('romantic-').join('romantic')
			};
			episodes.push(animeEpisode);
		});

		redisClient.setKeyWithEx('lastEpisodes', JSON.stringify(episodes), 1800);
		res.json({ episodes, source: 'api' });
	}
};

module.exports = lastEpisodes;