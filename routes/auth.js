const router = require("express").Router();
const User = require("../model/User");
const { registervalidation, loginvalidation } = require("../utils/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAdmin = require("../middlewares/isAdmin");

router.get("/users", isAdmin, async (req, res) => {
	User.find()
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json(err.message));
});

router.post("/register", isAdmin, async (req, res) => {
	//validation of body fields
	const { error } = registervalidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	//validation for unique email
	const { userName, password, role } = req.body;

	const userfound = await User.findOne({ userName: req.body.userName });
	if (userfound) return res.status(400).send("userName already exist");
	//hasing of the password fileds
	const hashedPassword = await bcrypt.hash(password, 10);
	const user = new User({
		userName: userName.toLowerCase(),
		password: hashedPassword,
		role,
	});
	user.save(function (err, obj) {
		if (err) return res.status(400).json(err.message);

		res.json({ message: "User Created!!!", data: obj });
	});
});

router.post("/login", async (req, res) => {
	const { error } = loginvalidation(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	//validation for unique email
	const user = await User.findOne({
		userName: req.body.userName.toLowerCase(),
	});
	if (!user) return res.status(400).send("Username doesnot exist");
	const validatepassword = await bcrypt.compare(
		req.body.password,
		user.password,
	);
	if (!validatepassword) return res.status(400).send("Incorrect password");

	//generating json web tokens
	const token = jwt.sign(
		{ id: user._id, role: user.role },
		process.env.jwt_secretkey,
	);
	res.header("auth-token", token).json({ token });
});

router.delete("/user/delete/:id", (req, res) => {
	User.findByIdAndDelete(req.params.id)
		.then((user) => res.json("User Deleted"))
		.catch((err) => res.status(400).json(err));
});

module.exports = router;
