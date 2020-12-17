const express = require('express');
router = express.Router();
//Importing Schema
const Test = require('../model/Test');
const Parameter = require('../model/Parameter');

router.get('/', (req, res) => {
	Test.find()
		.then((test) => res.json(test))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.post('/add', (req, res) => {
	const name = req.body.name;
	const amount = Number(req.body.unit);
	const parameter = Parameter(req.body.volume);

	const newTest = new Test({
		name,
        amount,
        parameter
	});

	newTest
		.save()
		.then(() => res.json('Test Added'))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.get('/:id', (req, res) => {
	Test.findById(req.params.id)
		.then((test) => res.json(test))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.put('/update/:id', (req, res) => {
	const fields = Object.keys(req.body);

	Test.findByIdAndUpdate(req.params.id)
		.then((test) => {
			fields.forEach((field) => {
				test[field] = req.body[field];
			});

			test
				.save()
				.then(() => res.json('Test Updated'))
				.catch((err) => res.status(400).json('Error:' + err));
		})
		.catch((err) => res.status(400).json('Error:' + err));
});

router.delete('/delete/:id', (req, res) => {
	Test.findByIdAndDelete(req.params.id)
		.then((test) => res.json(test))
		.catch((err) => res.status(400).json('Error:' + err));
});

module.exports = router;
