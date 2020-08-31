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

		const { is_admin } = admin[0];

		if (is_admin) {
			return next();
		}

		res.status(401).send(`El usuario ${user_id} no tiene permisos de Admin en la base de datos`);
	} catch (err) {
		res.status(401).send('Hubo un error en la validación con la base de datos, ' + err);
	}
};

module.exports = { validateAdminDB };
