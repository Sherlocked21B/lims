const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const token = req.header('authorization')[1];

	if (!token)
		return res.status(401).json({ message: 'You are not authorized' });
	try {
		const authorization = jwt.verify(token, process.env.jwt_secretkey);
		const { id, role } = authorization;
		if (role === 'admin' || role === 'accountant') {
			req.userId = id;
			req.role = role;
			next();
		} else {
			throw new Error('You are not accountant');
		}
	} catch (error) {
		res.status(400).json({ message: error });
	}
};
