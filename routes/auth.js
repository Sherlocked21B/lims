const router = require('express').Router();
const User = require('../model/User');
const { registervalidation, loginvalidation } = require('../utils/validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
	//validation of body fields
	const { error } = registervalidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	//validation for unique email
	const { userName, password, role, adminId, adminPassword } = req.body;
	if (adminId !== 'admin123' || adminPassword !== 'password123')
		return res.status(400).json({ error: 'Not authorized from admin' });

	const userfound = await User.findOne({ userName: req.body.userName });
	if (userfound) return res.status(400).send('userName already exist');
	//hasing of the password fileds
	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		const user = new User({
			userName: userName.toLowerCase(),
			password: hashedPassword,
			role,
		});
		await user.save();
		res.send('User created successfully');
	} catch (e) {
		console.log(e);
		res.status(400).send(err);
	}
});

router.post('/login', async (req, res) => {
	const { error } = loginvalidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	//validation for unique email
	const user = await User.findOne({
		userName: req.body.userName.toLowerCase(),
	});
	if (!user) return res.status(400).send('userName doesnot exist');
	const validatepassword = await bcrypt.compare(
		req.body.password,
		user.password
	);
	if (!validatepassword) return res.status(400).send('incorrect password');

	//generating json web tokens
	const token = jwt.sign(
		{ id: user._id, role: user.role },
		process.env.jwt_secretkey
	);
	res.header('auth-token', token).json({ token });
});

module.exports = router;
