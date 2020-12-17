const express = require('express');
const isStaff = require('../middlewares/isStaff');
router = express.Router();
//Importing Schema
const Customer = require('../model/Customer');

router.get('/', isStaff, (req, res) => {
	Customer.find()
		.then((customer) => res.json(customer))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.post('/add', isStaff, (req, res) => {
	const name = req.body.name;
	const age = Number(req.body.age);
	const address = req.body.address;
	const fee = Number(req.body.fee);
	const gender = req.body.gender;
	const test = [req.body.test];
	const sample = [req.body.sample];

	const newCustomer = new Customer({
		name,
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

router.get('/:id', isStaff, (req, res) => {
	Customer.findById(req.params.id)
		.then((customer) => res.json(customer))
		.catch((err) => res.status(400).json('Error:' + err));
});

router.put('/update/:id', isStaff, (req, res) => {
	Customer.findById(req.params.id)
		.then((customer) => {
			customer.name = req.body.name;
			customer.age = Number(req.body.age);
			customer.address = req.body.address;
			customer.fee = Number(req.body.fee);
			customer.gender = req.body.gender;
			customer.test = [req.body.test];
			customer.sample = [req.body.sample];

			customer
				.save()
				.then(() => res.json('Customer Updated'))
				.catch((err) => res.status(400).json('Error:' + err));
		})
		.catch((err) => res.status(400).json('Error:' + err));
});

router.delete('/delete/:id', isStaff, (req, res) => {
	Customer.findByIdAndDelete(req.params.id)
		.then((customer) => res.json(customer))
		.catch((err) => res.status(400).json('Error:' + err));
});

module.exports = router;
