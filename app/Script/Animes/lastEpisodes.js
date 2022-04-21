const { getHtml } = require('../../helpers');
const Redis = require('ioredis');

const LastEpisodes = async(res) => {
	const client = new Redis(process.env.REDIS_URL);
	const reply = await client.get('lastEpisodes');

	if (reply) {
		client.quit();
		res.json({ LastEpisodes: JSON.parse(reply), source: 'cache'}); 
	}
	else {
		const $ = await getHtml('https://www.animefenix.com/');
		const LastEpisodes = [];

		$('.capitulos-grid .item').each(function(){
			const $this = $(this);
			const episodio = {
				id: $this.find('a').attr('href').split('https://www.animefenix.com/')[1].split('/')[1],
				title: $this.find('div.overtitle').text().split('\n').join(''),
				img: $this.find('img').attr('src'),
				episode: $this.find('div.overepisode').text().split('\n').join(''),
				name_id: $this.find('div.overtitle').text().trim().replace(/[.:!?¡¿(),'"]/g,'').replace('=','-').split(' ').join('-').toLowerCase().split(' ').join('').split('θ').join('-theta').split('---').join('-').split('--').join('-').split('story-').join('story').split('romantic-').join('romantic')
			};
			LastEpisodes.push(episodio);
		});
		

		client.set('lastEpisodes', JSON.stringify(LastEpisodes), 'EX', 1800);
		client.quit();

		res.json({ LastEpisodes, source: 'api' });
	}
};




module.exports = LastEpisodes;