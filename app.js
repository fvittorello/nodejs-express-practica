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

function errorHandler(err, req, res){
    switch (err.message) {
        case "Por favor ingrese un correo válido.":
            res.status(400).send(err.message)
            break;
        case "Correo duplicado, ¡ya te registraste!":
            res.status(403).send(err.message)
            break;
        default:
            res.status(500).send('Error no esperado: ' + err.message)
            break;
    }
}

app.post('/registrarse', (req, res) => {
    try {
        let data = req.body; // nombre: algo, email: algo@algo.com
        participantes.pushParticipantes(data)
        res.send('usuario creado')
    } catch (err) {
        errorHandler(err, req, res)
    }
 

})

app.get('/participantes', (req, res) => {
    res.status(200).send(participantes.getParticipantes())
})

//Inicio servidor
app.listen(3000, () => {
    console.log('Servidor iniciado!')
});
