const express = require('express');
router = express.Router();
//Importing Schema
const { Reagent } = require('../model/Reagent');

router.get('/', (req, res) => {
	Reagent.find()
		.then((reagent) => res.json(reagent))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.post('/add', (req, res) => {
	// const name = req.body.name;
	// const unit = req.body.unit;
	// const volume = Number(req.body.volume);

	//auto conversion from string to number by mongoose

	const { name, unit, volume } = req.body;

	const newReagent = new Reagent({
		name,
		unit,
		volume,
	});

	newReagent
		.save()
		.then(() => res.json('Reagent Added'))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.get('/:id', (req, res) => {
	Reagent.findById(req.params.id)
		.then((reagent) => res.json(reagent))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.put('/update/:id', (req, res) => {
	// const fields = Object.keys(req.body);

	// Reagent.findByIdAndUpdate(req.params.id)
	// 	.then((reagent) => {
	// 		fields.forEach((field) => {
	// 			reagent[field] = req.body[field];
	// 		});

	// 		reagent
	// 			.save()
	// 			.then(() => res.json('Reagent Updated'))
	// 			.catch((err) => res.status(400).json('Error:' + err));
	// 	})
	// 	.catch((err) => res.status(400).json('Error:' + err));

	Reagent.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
		if (err) {
			return res.status(400).json({ message: err });
		}
		res.json(doc);
	});
});

router.delete('/delete/:id', (req, res) => {
	Reagent.findByIdAndDelete(req.params.id)
		.then((reagent) => res.json(reagent))
		.catch((err) => res.status(400).json('Error:' + err));
});

module.exports = router;
