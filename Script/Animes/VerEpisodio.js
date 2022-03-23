const axios = require('axios');
const cheerio = require('cheerio');


const VerEpisodio = async (id) => {
	const u = `https://www.animefenix.com/ver/${id}`;
	const response = await axios(u);
	const $ = cheerio.load(response.data);
		
	const Nombre = $('ul.episode-page__servers-list > li').toArray().map((element) => $(element).text().trim());
	const URL = $('.player-container').find('script').html().match(/(?<=src=["'])([^"'])*/gm);
	
	Nombre.forEach(async(element, index) => {
		const data = await axios(URL[index]);
		const $$ = cheerio.load(data.data);
		const livideo = $$('script').html().match(/(?<=src=["'])([^"'])*/gm).map(it => {
			return it.replace('..', '').replace('/stream/amz.php?', 'https://www.animefenix.com/stream/amz.php').replace('/stream/fl.php?v=https://', 'https://www.animefenix.com/redirect.php?player=22&code=');
		});
		
		return { Nombre: element, URL: livideo };
		
	});


	
	


	


	// Link.names.forEach((element, i) => {
	// 	const urlpage = Link.urldefe[i].replace('amp;', '');
	
	// 	getLink2(urlpage, element).then(it => {
	// 		gg.push(it);
	// 	});
		
	// });
};

// const rplc = (text) => {
// 	text = text.replace('var tabsArray = new Object();', '');
// 	for (let i = 0; i <= 15; i++) {
// 		text = text.replace(`tabsArray['${i}'] = "`, '');
// 	}
// 	text = text.replace(/";/g, '');
// 	text = text.replace(/\n/g, '');
// 	text = text.replace(/ {2}/g, '');
// 	text = text.replaceAll('</iframe>', '</iframe>\n');
// 	text = text.replace(
// 		'console.log("primer elemento ----------- >" + tabsArray[1]);',
// 		'',
// 	);
// 	return text;
// };

// const getLink = async (id) => {
// 	const url = `https://www.animefenix.com/ver/${id}`;
	
// 	const response = await axios(url);
// 	const $ = cheerio.load(response.data);
		
// 	const names = $('ul.episode-page__servers-list > li').toArray().map((element) => $(element).text().trim());
// 	const urldefe = $('.player-container').find('script').html().match(/(?<=src=["'])([^"'])*/gm);
    
// 	return {
// 		names : names,
// 		urldefe : urldefe
// 	};
// };

// const getLink2 = async(link) => {
// 	link.names.forEach(async(element, i) => {
// 		const response = await axios(link.urldefe[i]);
// 		const $$ = cheerio.load(response.data);
// 		const livideo = $$('script').html().match(/(?<=src=["'])([^"'])*/gm).map(it => {
// 			return it.replace('..', '').replace('/stream/amz.php?', 'https://www.animefenix.com/stream/amz.php').replace('/stream/fl.php?v=https://', 'https://www.animefenix.com/redirect.php?player=22&code=');
// 		});
		

// 		return {
// 			name : element,
// 			link : livideo
// 		};
// 	});
// };


module.exports = VerEpisodio;



// const getvideo = async () => {
			
// 			names.forEach((name, i) => {
// 				const urlpage = urldefe[i].replace('amp;', '');
// 				const pagevideo = axios(urlpage);

// 				pagevideo.then(respo => {
// 					const $$ = cheerio.load(respo.data);
// 					const livideo = $$('script').html().match(/(?<=src=["'])([^"'])*/gm).map(it => {
// 						return it.replace('..', '').replace('/stream/amz.php?', 'https://www.animefenix.com/stream/amz.php').replace('/stream/fl.php?v=https://', 'https://www.animefenix.com/redirect.php?player=22&code=');
// 					});

// 					serverList.push({ name, url: livideo[0] });
// 					if (serverList.length == names.length) {
				
// 						serverList.map(it => { if (it.name == 'M') it.name = 'Mega'; return it; });
				
// 						response.data = serverList;
// 					}
					
// 				});
							
// 			});
			
// 		};
// 		getvideo();




// const VerEpisodio = async (id) => {
// 	const url = `https://www.animefenix.com/ver/${id}`;
// 	const serverList = [];
	
// 	const response = await axios(url);
// 	const $ = cheerio.load(response.data);
		
// 	const names = $('ul.episode-page__servers-list > li').toArray().map((element) => $(element).text().trim());
// 	const urldefe = $('.player-container').find('script').html().match(/(?<=src=["'])([^"'])*/gm);

		
// 	names.forEach((name, i) => {
// 		const urlpage = urldefe[i].replace('amp;', '');
// 		const pagevideo = axios(urlpage);

		
// 		pagevideo.then(respo => {
// 			const $$ = cheerio.load(respo.data);
// 			const livideo = $$('script').html().match(/(?<=src=["'])([^"'])*/gm).map(it => {
// 				return it.replace('..', '').replace('/stream/amz.php?', 'https://www.animefenix.com/stream/amz.php').replace('/stream/fl.php?v=https://', 'https://www.animefenix.com/redirect.php?player=22&code=');
// 			});

// 			serverList.push({ name, url: livideo[0] });
			
// 			if (serverList.length == names.length) {
// 				serverList.map(it => { if (it.name == 'M') it.name = 'Mega'; return it; });
// 			}
// 		});
         
		
// 	});
    
	

// };



// const response = await axios(link);
// 	const $$ = cheerio.load(response.data);
// 	const livideo = $$('script').html().match(/(?<=src=["'])([^"'])*/gm).map(it => {
// 		return it.replace('..', '').replace('/stream/amz.php?', 'https://www.animefenix.com/stream/amz.php').replace('/stream/fl.php?v=https://', 'https://www.animefenix.com/redirect.php?player=22&code=');
// 	});

// 	return{ 
// 		names, 
// 		url: livideo[0]
// 	};


// async function getEpisode(episode) {
	
// 	const response = await axios(episode);
// 	const $ = cheerio.load(response);

// 	let Episode;
// 	const ctrls = [];
// 	const server_list = [];

// 	$('.hero section:nth-child(2) .container .columns.is-multiline .column.is-12-mobile.is-4-tablet.is-3-desktop .columns div',).each((i, e) => {
// 		const el = $(e);
// 		const ctrl = el.find('a').attr('href').replace(this.url + '/ver/', '').replace(this.url + '/', '').split('-');
// 		const arr = [ctrl.length - 1];
// 		ctrls.push(arr[0]);
// 	});

// 	let prev = false;
// 	let next = false;
// 	if (ctrls.length == 3) {
// 		prev = true;
// 		next = true;
// 	} else {
// 		if (ctrls[0] < ctrls[1]) {
// 			next = true;
// 		} else {
// 			prev = true;
// 		}
// 	}

// 	$('.hero section:nth-child(2)').each((i, e) => {
// 		const el = $(e);
// 		const title = el.find('h1.title').text().trim();
// 		let no_ep = episode.split('-');
// 		no_ep = parseInt(no_ep[no_ep.length - 1]);
// 		const anime_id = episode.replace(`-${no_ep}`, '');
// 		Episode = {
// 			anime_id,
// 			title,
// 			no_ep,
// 			ctrls: {
// 				prev,
// 				next,
// 			},
// 			servers: server_list,
// 		};
// 	});
// 	$('.player-container').each((i, e) => {
// 		const el = $(e);
// 		const servers = el.find('script').html();
// 		$(this.rplc(servers)).each((i, e) => {
// 			const el = $(e);
// 			let f = el.attr('src');
// 			if (f !== undefined) {
// 				if (f.includes('http') == false) {
// 					f = 'https://' + f;
// 				}
// 				f = f.replace('https://../', 'https://');
// 				f = f.replace('https:////', 'https://');
// 				f = f.replace('https:///', 'https://');
// 				f = f.replace('"', '');
// 				const videolinks = new URL(f);
// 				const { host } = videolinks;
// 				let name = host
// 					.replace('.com', '')
// 					.replace('www.', '')
// 					.replace('.ru', '')
// 					.replace('repro.', '')
// 					.replace('.co', '')
// 					.replace('.nz', '');
// 				name = `${name.slice(0, 1).toUpperCase()}${name.slice(1)}`;
// 				const server = {
// 					url: f,
// 					name,
// 				};
// 				server_list.push(server);
// 			}
// 		});
// 	});
// 	console.log(Episode);
// 	return Episode;

// }
