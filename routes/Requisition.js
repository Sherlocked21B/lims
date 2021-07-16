const express = require('express');
router = express.Router();

const Requisition = require('../model/Requisition');

router.get('/', (req, res) => {
	Requisition.find()
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.post('/add', (req, res) => {
	const { request } = req.body;

	const newResult = new Requisition({
		request,
	});

	newResult
		.save()
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.get('/:id', (req, res) => {
	Requisition.findById(req.params.id)
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.put('/update/:id', (req, res) => {
	Requisition.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
		if (err) {
			return res.status(400).json({ message: err });
		}
		res.json(doc);
	});
});

router.delete('/delete/:id', (req, res) => {
	Requisition.findByIdAndDelete(req.params.id)
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json('Error:' + err));
});

module.exports = router;
