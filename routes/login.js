const router = require('express').Router();
const sequelize = require('../db');
const { QueryTypes } = require('sequelize');
const { generateToken } = require('../services/jwt.services');

router.post('/', async (req, res) => {
	const { email, password } = req.body;
	try {
		const login = await sequelize.query(
			'SELECT user_id, firstname, email, is_admin FROM users WHERE email = :email AND password = :password',
			{
				replacements: {
					email,
					password,
				},
				type: QueryTypes.SELECT,
			}
		);

		if (!!login[0].is_admin) {
			const { user_id, firstname, email, is_admin } = login[0];
			console.log(`user-id = ${user_id}, firstname = ${firstname}, email = ${email}, admin = ${is_admin}`);
			const token = generateToken(login[0]);
			res.send({ token });
		} else {
			throw new Error('Usuario sin permisos de Admin');
			res.status(401).send('No dispones de permisos de Admin');
		}
	} catch (err) {
		console.log(err);
		res.status(404).send('Error al intentar ingresar');
	}
});

module.exports = router;
