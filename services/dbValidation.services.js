const db = require('../db');

const validateAdmin = async (req, res, next) => {
	try {
		const admin = await db.query('SELECT is_admin FROM users WHERE email = :email', {
			replacements: {
				email: req.body.email,
			},
		});

		if (admin) {
			next();
		}
	} catch (err) {
		console.log(err);
		res.status(401).send('No dispones de permisos de Admin');
	}
};

module.exports = { validateAdmin };
