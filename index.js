const express = require('express');
const app = express();
const Home = require('./Rutas.json');

/*/ Noticias */
const { Reviews, Populares, MasNoticias, Recientes } = require('./Script/News')

/*/  Animes  */
const { LastEpisodes } = require('./Script/Animes/lastEpisodes.js');




app.get('/', (req, res) => {
    res.json(Home);
})

app.get('/api/news/:categoria', (req, res) => {
    switch (req.params.categoria) {
       
        case 'masNoticias':
           MasNoticias().then(noticias => {
            res.json(noticias);
           });
            break;

        case 'populares':
            Populares().then(noticias => {
                res.json(noticias);
            });
            break;  

        case 'recientes':
            Recientes().then(noticias => {
            res.json(noticias);
           });
            break;
        
        case 'reviews':
             Reviews().then(noticias => {
               res.json(noticias);
              });
            break;

        default:
             res.send('No se encontro la categoria').end();
         break;
         
    }
})


app.get('/api/anime/:opcion', (req, res) => {
      switch (req.params.opcion) {
        case 'lastEpisodes':
            LastEpisodes().then(animes => {
                res.json(animes);
            });
            break;
            


        default:
            res.send('No se encontro la opcion').end();
            break;
             
      }
      









})







const port = 3001;

app.listen(port, () => {
    console.log(`Ya se levanto (el servidor)🥵 http://localhost:${port}`);
});