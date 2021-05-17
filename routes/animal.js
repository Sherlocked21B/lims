const express = require('express');
router = express.Router();
//Importing Schema
const Animal = require('../model/Animal');

router.get('/', (req, res) => {
	Animal.find()
		.then((Animal) => res.json(Animal))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.post('/add', (req, res) => {
	const { category, species } = req.body;

	const newAnimal = new Animal({
		category,
		species,
	});

	newAnimal
		.save()
		.then((animal) =>
			res.json({ animal: animal, message: 'animal saved successfully' })
		)
		.catch((err) => res.status(400).json('Error:' + err));
});

router.get('/:id', (req, res) => {
	Animal.findById(req.params.id)
		.then((Animal) => res.json(Animal))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.get('/search/:query', (req, res) => {
	const term = RegExp(`${req.params.query}`);
	Animal.find({
		$expr: {
			$regexMatch: {
				input: '$category',
				regex: term, //Your text search here
				options: 'i',
			},
		},
	})
		.then((animal) => res.json(animal))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.put("/update/:id", (req, res) => {
	Animal.findByIdAndUpdate(
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

router.delete('/delete/:id', (req, res) => {
	Animal.findByIdAndDelete(req.params.id)
		.then((animal) => res.json(animal))
		.catch((err) => res.status(400).json('Error:' + err));
});

module.exports = router;
