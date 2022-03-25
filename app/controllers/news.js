const newsRouter = require('express').Router();
const { Reviews, Populares, MasNoticias, Recientes } = require('../Script/News');

newsRouter.get('/:categoria', async (req , res) => {
	switch (req.params.categoria) {
	case 'masnoticias':
		await MasNoticias(res);
		break;

	case 'populares':
		await Populares(res);
		break;  

	case 'recientes':
		await Recientes(res);
		break;
    
	case 'reviews':
		await Reviews(res);
		break;

	default:
		res.send('No se encontro la categoria').end();
		break;   
	}
});

module.exports = newsRouter;