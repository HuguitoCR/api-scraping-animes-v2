const { getHtml } = require('../../helpers');
const Redis = require('ioredis');

const LastEpisodes = async() => {
	const client = new Redis(process.env.REDIS_URL);
	const reply = await client.get('lastEpisodes');

	if (reply) {
		client.quit();
		return JSON.parse(reply); 
	}
	else {
		const $ = getHtml('https://www.animefenix.com/');
		const LastEpisodes = [];

		$('.capitulos-grid .item').each(function(){
			const episodio = {
				id: $(this).find('a').attr('href').split('https://www.animefenix.com/')[1],
				title: $(this).find('div.overtitle').text().split('\n').join(''),
				img: $(this).find('img').attr('src'),
				episode: $(this).find('div.overepisode').text().split('\n').join('')
			};
			LastEpisodes.push(episodio);
		});
		

		client.set('lastEpisodes', JSON.stringify(LastEpisodes), 'EX', 1800);
		client.quit();

		return LastEpisodes;
	}
};




module.exports = LastEpisodes;