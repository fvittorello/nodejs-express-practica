const router = require('express').Router();
const sequelize = require('../db');
const { QueryTypes } = require('sequelize');
const { generateToken, validateToken } = require('../services/jwt.services');

router.post('/', async (req, res) => {
	const { email, password } = req.body;

	try {
		const login = await sequelize.query(
			'SELECT user_id, firstname, email, is_admin FROM users WHERE email = :email AND password = :password',
			{
				replacements: {
					email: email,
					password: password,
				},
				type: QueryTypes.SELECT,
			}
		);
		console.log(`Respuesta de login ${login}`);

		if (login) {
			const { user_id, firstname, email, is_admin } = login[0];
			console.log(`
                user-id es ${user_id},
                firstname es ${firstname},
                email es ${email},
                admin es ${is_admin}
            `);
			const token = generateToken(login[0]);
			res.send(token);
		}
	} catch (err) {
		console.log(err);
		res.status(500).send('Error al intentar ingresar');
	}
});

module.exports = router;
