const express = require("express");
router = express.Router();
const Reference = require("../model/Reference");

router.get("/", (req, res) => {
	let testName = req.query.testName;
	let animalName = req.query.animalName;
	Reference.find({ testName: testName, animalName: animalName })
		.then((result) => res.json(result))
		.catch((err) => {
			console.log(err);
			res.status(400).send(err);
		});
});

router.post("/add", (req, res) => {
	const { testName, animalName, refTable } = req.body;

	const newReference = new Reference({
		testName,
		animalName,
		refTable,
	});

	newReference
		.save()
		.then((result) => res.json(result))
		.catch((err) =>
			res.status(400).json({ message: "Error occured", error: err }),
		);
});

router.get("/:id", (req, res) => {
	Reference.findById(req.params.id)
		.then((result) => res.json(result))
		.catch((err) =>
			res.status(400).json({ message: "Error occured", error: err }),
		);
});

router.get("/find/:animalName", (req, res) => {
	// let animal = req.query.animalName;
	Reference.find({ animalName: req.params.animalName })
		.then((result) => res.json(result))
		.catch((err) =>
			res.status(400).json({ message: "Error occured", error: err }),
		);
});

router.put("/update/:id", (req, res) => {
	Reference.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
		if (err) {
			return res.status(400).json({ message: "Error occured", error: err });
		}
		res.json(doc);
	});
});

router.delete("/delete/:id", (req, res) => {
	Reference.findByIdAndDelete(req.params.id)
		.then((result) => res.json(result))
		.catch((err) =>
			res.status(400).json({ message: "Error occured", error: err }),
		);
});

module.exports = router;
