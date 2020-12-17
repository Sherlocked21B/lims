const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const token = req.headers.authorization.split(' ')[1];

	if (!token)
		return res.status(401).json({ message: 'You are not authorized' });
	try {
		const authorization = jwt.verify(token, 'dfdsfsdsdf333');
		const { id, role } = authorization;
		if (role === 'admin') {
			req.userId = id;
			req.role = role;
			return next();
		} else {
			throw new Error('You are not admin');
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: error });
	}
};
