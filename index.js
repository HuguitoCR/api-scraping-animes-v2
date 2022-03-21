const express = require('express');
const app = express();
const  Home = require('./Rutas.json');
const { MasNoticias } = require('./Script/news/MasNoticias.js');
const { Recientes } = require('./Script/news/Recientes.js');
const { Populares } = require('./Script/news/Populares.js');
const { Reviews } = require('./Script/news/Reviews.js');







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
             res.send('No se encontro la categoria');
         break;
         
    }
})










const port = 3001;

app.listen(port, () => {
    console.log(`Ya se levanto (el servidor)🥵 http://localhost:${port}`);
});