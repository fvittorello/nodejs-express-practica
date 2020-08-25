const router = require('express').Router();
const sequelize = require('../db');
const { QueryTypes } = require('sequelize');
const { validateAdminDB } = require('../services/dbValidation.services');
const { validateToken } = require('../services/jwt.services');

router.get('/', validateToken, (req, res) => {
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
	const { firstname, lastname, email, password } = req.body;

	sequelize
		.query(
			'INSERT INTO users (firstname, lastname, email, password) VALUES (:firstname, :lastname, :email, :password)',
			{
				replacements: {
					firstname,
					lastname,
					email,
					password,
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

router.patch('/', validateToken, validateAdminDB, async (req, res) => {
	const { is_admin_cambio, user_id_cambio } = req.body;
	console.log(is_admin_cambio, user_id_cambio);

	try {
		const algo = await sequelize.query('UPDATE users SET is_admin = :is_admin_cambio WHERE user_id = :user_id_cambio', {
			replacements: {
				user_id_cambio,
				is_admin_cambio,
			},
		});

		console.log(`Esto es algo ${algo}`);

		res.status(200).send(`Se han cambiado los permisos de Admin del usuario ${user_id_cambio} a ${is_admin_cambio}`);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
