const express = require("express");
router = express.Router();
//Importing Schema
const Customer = require("../model/Customer");

router.get("/", (req, res) => {
	let page = req.query.page;
	let limit = req.query.limit;

	const options = {
		offset: page ? page * limit : 0,
		limit: limit ? limit : 20,
	};

	Customer.paginate({}, options, (err, result) => {
		if (err) {
			return res.status(400).json({ message: err });
		}
		res.json({ rows: result.docs, total: result.totalDocs, page: result.page });
	});
});

router.post("/add", (req, res) => {
	const { firstName, lastName, age, address, gender, contactNumber } = req.body;

	const newCustomer = new Customer({
		firstName,
		lastName,
		age,
		address,
		gender,
		contactNumber,
	});

	newCustomer.save(function (err, obj) {
		if (err) return res.status(400).json(err.message);

		res.json({ message: "Customer added!", data: obj });
	});
});

router.get("/:id", (req, res) => {
	Customer.findById(req.params.id)
		.then((customer) => res.json(customer))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.put("/update/:id", (req, res) => {
	Customer.findByIdAndUpdate(
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
	Customer.findByIdAndDelete(req.params.id)
		.then((customer) => res.json(customer))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.get("/search/:query", (req, res) => {
	const term = RegExp(`${req.params.query}`);
	Customer.find({
		$expr: {
			$regexMatch: {
				input: { $concat: ["$firstName", " ", "$lastName"] },
				regex: term, //Your text search here
				options: "i",
			},
		},
	})
		.then((customers) => res.json(customers))
		.catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
