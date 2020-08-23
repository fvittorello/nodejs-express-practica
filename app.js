const express = require('express');
const app = express();
const db = require('./db');
const cors = require('cors');

//Services
const participantes = require('./services/participantes.services');

//Middlewares
app.use(express.json());
app.use(express.static('public'));
app.use(cors());

//Endpoints
const usersRoute = require('./routes/users');
app.use('/users', usersRoute);

app.get('/', (req, res) => {
	res.sendfile('./public/index.html');
});

function errorHandler(err, req, res) {
	switch (err.message) {
		case 'Por favor ingrese un correo válido.':
			res.status(400).send(err.message);
			break;
		case 'Correo duplicado, ¡ya te registraste!':
			res.status(403).send(err.message);
			break;
		default:
			res.status(500).send('Error no esperado: ' + err.message);
			break;
	}
}

app.post('/registrarse', (req, res) => {
	try {
		let data = req.body; // nombre: algo, email: algo@algo.com
		console.log(data);
		db.query(
			'INSERT INTO users (firstname, lastname, email, password) VALUES (:firstname, :lastname, :email, :password)',
			{
				replacements: {
					firstname: data.firstname,
					lastname: data.lastname,
					email: data.email,
					password: data.password,
				},
			}
		);
		// participantes.pushParticipantes(data);
		res.status(200).json({ message: 'usuario creado' });
	} catch (err) {
		errorHandler(err, req, res);
	}
});

app.get('/participantes', (req, res) => {
	res.status(200).send(participantes.getParticipantes());
});

//Inicio servidor
// app.listen(3000, () => {
// 	console.log('Servidor iniciado!');
// });

//  TESTEO DE DB
async function iniciarServidor() {
	db.query('SELECT 1 + 1 AS solution')

		.then((r) => {
			app.listen(3000, () => {
				console.log('Servidor Iniciado en el puerto ' + 3000);
			});
			console.log(r[0][0].solution);
		})
		.catch((error) => {
			console.log(error);
			console.log('NO Pude conectar a la base de datos');
		});
}

iniciarServidor();

/*try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
} */
