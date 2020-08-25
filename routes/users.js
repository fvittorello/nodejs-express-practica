const router = require('express').Router();
const sequelize = require('../db');
const { QueryTypes } = require('sequelize');
const { validateAdminDB } = require('../services/dbValidation.services');
const { validateToken } = require('../services/jwt.services');
const { hashPass, comparePass } = require('../services/passEncryption');

router.get('/', validateToken, async (req, res) => {
	try {
		const results = await sequelize.query(
			'SELECT user_id, firstname, lastname, email, is_admin, is_disabled, created_at, updated_at FROM users',
			{ type: sequelize.QueryTypes.SELECT }
		);
		res.status(200).send(results);
	} catch (err) {
		console.log(err);
		res.status(500).send('Hubo un problema con la busqueda de usuarios');
	}
});

router.post('/', async (req, res) => {
	const { firstname, lastname, email, password } = req.body;
	const encrypted = hashPass(password);
	try {
		const query = await sequelize.query(
			'INSERT INTO users (firstname, lastname, email, password) VALUES (:firstname, :lastname, :email, :password)',
			{
				replacements: {
					firstname,
					lastname,
					email,
					password: encrypted,
				},
			}
		);

		res.status(201).send(`Gracias por registrarte ${firstname}`);
	} catch (err) {
		console.log(err);
		res.status(500).send('Hubo un error y no se pudo registrar el usuario :(');
	}
});

router.patch('/', validateToken, validateAdminDB, async (req, res) => {
	const { is_admin_cambio, user_id_cambio } = req.body;
	try {
		const algo = await sequelize.query('UPDATE users SET is_admin = :is_admin_cambio WHERE user_id = :user_id_cambio', {
			replacements: {
				user_id_cambio,
				is_admin_cambio,
			},
		});

		res.status(200).send(`Se han cambiado los permisos de Admin del usuario ${user_id_cambio} a ${is_admin_cambio}`);
	} catch (err) {
		console.log(err);
		res.status(400).send(`No se ha podido actualizar el usuario ${user_id_cambio}`);
	}
});

module.exports = router;
