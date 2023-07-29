require('dotenv').config()
const express = require('express')
const sqlite = require('sqlite3').verbose();
const mongoose = require('mongoose')
const app = express();
const PORT = 3333
const day = new Date()
const hour = day.getHours()
const minutes = day.getMinutes()
const seconds = day.getSeconds()

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/src/views');
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
  res.render('index'); 
});

// const schema = new mongoose.Schema({
//     name: {type: String, required: true},
//     email: {type: String, required: true},
//     senha:{type: String, required: true}
// })

// mongoose.model('home',schema).create({
//     name:'daniel',
//     email:'danielarcanjo1@gmail.com',
//     senha:'12345678'
// }).then(dados => console.log(dados))

console.log('tentando conexão com o banco de dados')

mongoose.connect(process.env.CONNECTDB)
    .then( () => {
        console.log('conectao ao banco de dados as '+ hour+':'+minutes+':'+seconds)
        app.emit('pronto')
    })
    .catch( error => console.log('aconteceu um ERRO: '+ error))



app.on('pronto', () =>{
    app.listen(PORT, () => {
        try {
            console.log('Servidor Iniciado as '+ hour+':'+minutes+':'+seconds)
            console.log(`servidor rodando na porta ${PORT} acesse http://localhost:${PORT}`)
        } catch (error) {
            console.log('Erro' + error)
        }
    })
})
    

