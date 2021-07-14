const express = require("express");
router = express.Router();
//Importing Schema
const Method = require("../model/Method");

router.get("/", (req, res) => {
	Method.find()
		.then((Method) => res.json(Method))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.post("/add", (req, res) => {
	const { methodName } = req.body;

	const newMethod = new Method({
		methodName,
	});

	newMethod
		.save()
		.then((method) =>
			res.json({ method: method, message: "method saved successfully" }),
		)
		.catch((err) => res.status(400).json("Error:" + err));
});

router.get("/:id", (req, res) => {
	Method.findById(req.params.id)
		.then((Method) => res.json(Method))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.get("/search/:query", (req, res) => {
	const term = RegExp(`${req.params.query}`);
	Method.find({
		$expr: {
			$regexMatch: {
				input: "$category",
				regex: term, //Your text search here
				options: "i",
			},
		},
	})
		.then((Method) => res.json(Method))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.put("/update/:id", (req, res) => {
	Method.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
		(err, doc) => {
			if (err) {
				return res.status(400).json({ message: err });
			}
			res.json(doc);
		},
	);
});

router.delete("/delete/:id", (req, res) => {
	Method.findByIdAndDelete(req.params.id)
		.then((Method) => res.json(Method))
		.catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
