const express = require('express');
const app = express();

//Services
const participantes = require('./services/participantes.services');

//Middlewares
app.use(express.json())
app.use(express.static('public'))


//Endpoints
app.get('/', (req, res) => {
    res.sendfile('./public/index.html')
})

app.post('/registrarse', (req, res) => {
    let data = req.body; // nombre: algo, email: algo@algo.com
    participantes.pushParticipantes(data)
    res.send('usuario creado')

})

app.get('/participantes', (req, res) => {
    res.status(200).send(participantes.getParticipantes())
})

//Inicio servidor
app.listen(3000, () => {
    console.log('Servidor iniciado!')
});
