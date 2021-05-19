const express = require('express');
router = express.Router();
//Importing Schema
const Test = require('../model/Test');
const Parameter = require('../model/Parameter');

router.get('/', (req, res) => {
	let page = req.query.page;
	let limit = req.query.limit;

	const options = {
		offset: page ? page * limit : 0,
		limit: limit ? limit : 20,
	};

	Test.paginate({}, options, (err, result) => {
		if (err) {
			return res.status(400).json({ message: err });
		}
		res.json({ rows: result.docs, total: result.totalDocs, page: result.page });
	});
});

router.post('/add', (req, res) => {
	// const name = req.body.name;
	// const amount = Number(req.body.unit);
	// const parameter = Parameter(req.body.volume);

	//auto conversion from string to number by mongoose

	const { name, package, parameter } = req.body;

	const newTest = new Test({
		name,
		package,
		parameter,
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
	// const fields = Object.keys(req.body);

	// Test.findByIdAndUpdate(req.params.id)
	// 	.then((test) => {
	// 		fields.forEach((field) => {
	// 			test[field] = req.body[field];
	// 		});

	// 		test
	// 			.save()
	// 			.then(() => res.json('Test Updated'))
	// 			.catch((err) => res.status(400).json('Error:' + err));
	// 	})
	// 	.catch((err) => res.status(400).json('Error:' + err));
	Test.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
		if (err) {
			return res.status(400).json({ message: err });
		}
		res.json('Test Updated');
	});
});

router.get('/search/:query', (req, res) => {
	const term = RegExp(`${req.params.query}`);
	Test.find({
		$expr: {
			$regexMatch: {
				input: '$name',
				regex: term, //Your text search here
				options: 'i',
			},
		},
	})
		.then((test) => res.json(test))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.delete('/delete/:id', (req, res) => {
	Test.findByIdAndDelete(req.params.id)
		.then((test) => res.json(test))
		.catch((err) => res.status(400).json('Error:' + err));
});

module.exports = router;
