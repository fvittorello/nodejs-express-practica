const db = require('../db');
const { QueryTypes } = require('sequelize');

const validateAdminDB = async (req, res, next) => {
	try {
		const { user_id } = req.body;

		const admin = await db.query('SELECT is_admin FROM users WHERE user_id = :user_id', {
			replacements: {
				user_id,
			},
			type: QueryTypes.SELECT,
		});

		console.log(admin);
		const { is_admin } = admin[0];
		console.log(`El valor de const admin es ${!!is_admin}`);

		if (is_admin) {
			console.log('condition ok');
			return next();
		}

		res.status(401).send(`El usuario ${user_id} no tiene permisos de Admin en la base de datos`);
	} catch (err) {
		console.log(err);
		res.status(401).send('Hubo un error en la validación con la base de datos, ' + err);
	}
};

module.exports = { validateAdminDB };
