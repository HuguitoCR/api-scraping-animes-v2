const axios = require('axios');
const cheerio = require('cheerio');

const getHtml = async(url) => {
	const html = await axios(url);
	return cheerio.load(html.data);
};

module.exports = getHtml;