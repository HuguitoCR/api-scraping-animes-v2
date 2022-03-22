const axios = require('axios');
const cheerio = require('cheerio');
const Redis = require('ioredis');



const LastEpisodes = async() => {
	const client = new Redis(process.env.REDIS_URL);
	const reply = await client.get('lastEpisodes');

	if (reply) {
		client.quit();
		return JSON.parse(reply); 
	}
	else {
		const url = 'https://www.animefenix.com/';
		const result = await axios.get(url);
		const $ = cheerio.load(result.data);
		const LastEpisodes = [];

				
		$('.capitulos-grid .item').each((i, elem) => {
			const Episodio = {
				titulo: $(elem).find('div.overtitle').text().split('\n').join(''),
				url: $(elem).find('a').attr('href').split('https://www.animefenix.com/')[1],
				imagen: $(elem).find('img').attr('src'),
				episodios: $(elem).find('div.overepisode').text().split('\n').join('')
			};
			LastEpisodes.push(Episodio);
		});
		

		client.set('lastEpisodes', JSON.stringify(LastEpisodes), 'EX', 1800);
		client.quit();

		return LastEpisodes;
	}
};




module.exports = LastEpisodes;