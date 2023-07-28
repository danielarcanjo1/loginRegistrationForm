const express = require('express')
const sqlite = require('sqlite3').verbose();
const app = express();
const mongoose = require('mongoose')
require('dotenv').config()
const PORT = 3333

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');


app.get('/', (req, res) => {
  res.render('index'); 
});

mongoose.connect(process.env.CONNECTDB)
    .then( () => {
        console.log('a conexão ocorreu')
        app.emit('pronto')
    })
    .catch( error => console.log('aconteceu um ERRO: '+ error))



app.on('pronto', () =>{
    app.listen(PORT, () => {
        try {
            console.log('Servidor Iniciado')
            console.log(`servidor rodando na porta ${PORT} acesse http://localhost:${PORT}`)
        } catch (error) {
            console.log('Erro' + error)
        }
    })
})
    

