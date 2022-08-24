const jwt = require('jsonwebtoken');


exports.verificarToken = async function (req, res, next) {
	try {
		if (!req.headers.authorization) {
			return res.status(403).send({ message: 'No permitido 1' });
		}
		let token = req.headers.authorization.replace(/['"]+/g, '');
		if (token === 'null') {
			return res.status(401).send({ message: 'No permitido 2' });
		}

		const payload = await jwt.verify(token, 'secret');
		if (!payload) {
			return res.status(401).send({ message: 'No permitido 3' });
		}

		req.user = payload;
		next();
	} catch (e) {
		return res.status(401).send({ message: 'Error al comprobar el token' });
	}
}
