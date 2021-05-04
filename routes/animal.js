const express = require("express");
router = express.Router();
//Importing Schema
const Animal = require("../model/Animal");

router.get("/", (req, res) => {
	Animal.find()
		.then((Animal) => res.json(Animal))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.post("/add", (req, res) => {
	const { animals } = req.body;

	const newAnimal = new Animal({
		animals,
	});

	newAnimal
		.save()
		.then((animal) =>
			res.json({ animal: animal, message: "animal saved successfully" }),
		)
		.catch((err) => res.status(400).json("Error:" + err));
});

router.get("/:id", (req, res) => {
	Animal.findById(req.params.id)
		.then((Animal) => res.json(Animal))
		.catch((err) => res.status(400).json("Error:" + err));
});

// router.get("/find/:id", (req, res) => {
// 	Animal.find({ sampleId: req.params.id })
// 		.then((reagents) => res.json(reagents))
// 		.catch((err) => res.status(400).json("Error:" + err));
// });

router.put("/update/:id", (req, res) => {
	Animal.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
		if (err) {
			return res.status(400).json({ message: err });
		}
		res.json(doc);
	});
});

router.delete("/delete/:id", (req, res) => {
	Animal.findByIdAndDelete(req.params.id)
		.then((animal) => res.json(animal))
		.catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
