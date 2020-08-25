const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPass = (pass) => {
	bcrypt.hash(pass, saltRounds, function (err, hash) {
		console.log(hash);
		return hash;
	});
};

const comparePass = (hash) => {
	try {
		bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
			console.log(result);
			return result;
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports = { hashPass, comparePass };
