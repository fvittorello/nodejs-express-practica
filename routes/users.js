const router = require('express').Router();
const sequelize = require('../db');

router.get('/', (req, res) => {
	sequelize
		.query('SELECT * FROM users', { type: sequelize.QueryTypes.SELECT })
		.then((results) => {
			res.status(200).send(results);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send('Hubo un problema con la busqueda de usuarios');
		});
});

router.post('/', (req, res) => {
	sequelize
		.query(
			'INSERT INTO users (firstname, lastname, email, password) VALUES (:firstname, :lastname, :email, :password)',
			{
				replacements: {
					firstname: req.body.firstname,
					lastname: req.body.lastname,
					email: req.body.email,
					password: req.body.password,
				},
			}
		)
		.then(() => {
			res.status(201).send(`Gracias por registrarte ${req.body.firstname}`);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send('Hubo un error y no se pudo registrar el usuario :(');
		});
});

module.exports = router;
