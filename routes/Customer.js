const express = require('express');
const isStaff = require('../middlewares/isStaff');
router = express.Router();
//Importing Schema
const Customer = require('../model/Customer');

router.get('/', (req, res) => {
	Customer.find()
		.then((customer) => res.json(customer))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.post('/add', isStaff, (req, res) => {
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const age = Number(req.body.age);
	const address = req.body.address;
	const fee = Number(req.body.fee);
	const gender = req.body.gender;
	const test = req.body.test;
	const sample = req.body.sample;

	const newCustomer = new Customer({
		firstName,
		lastName,
		age,
		address,
		fee,
		gender,
		test,
		sample,
	});

	newCustomer
		.save()
		.then(() => res.json('Customer Added'))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.get('/:id', (req, res) => {
	Customer.findById(req.params.id)
		.then((customer) => res.json(customer))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.put('/update/:id', (req, res) => {
	const fields = Object.keys(req.body);

	Customer.findByIdAndUpdate(req.params.id)
		.then((customer) => {
			fields.forEach((field) => {
				customer[field] = req.body[field];
			});

			customer
				.save()
				.then(() => res.json('Customer Updated'))
				.catch((err) => res.status(400).json('Error:' + err));
		})
		.catch((err) => res.status(400).json('Error:' + err));
});

router.delete('/delete/:id', (req, res) => {
	Customer.findByIdAndDelete(req.params.id)
		.then((customer) => res.json(customer))
		.catch((err) => res.status(400).json('Error:' + err));
});

module.exports = router;
