const express = require("express");
router = express.Router();
//Importing Schema
const Sample = require("../model/Sample");
const isStaff = require("../middlewares/isStaff");

router.get("/", (req, res) => {
	let page = req.query.page;
	let limit = req.query.limit;
	let sample = req.query.sampleId;
	let customer = req.query.Customer;
	let pet = req.query.Pet;

	let options = {
		offset: page ? page * limit : 0,
		limit: limit ? limit : 20,
		sort: { createdAt: -1 },
	};

	Sample.paginate(
		sample
			? { sampleNo: sample }
			: customer && pet
			? { customerId: customer, petName: pet }
			: customer
			? { customerId: customer }
			: pet
			? { petName: pet }
			: {},
		options,
		(err, result) => {
			if (err) {
				return res.status(400).json({ message: err });
			}
			res.json({ rows: result.docs, total: result.totalDocs });
		},
	);
});

router.post("/add", isStaff, (req, res) => {
	const {
		customerName,
		sampleNo,
		samplingDate,
		sampleSubmittedBy,
		category,
		animal,
		customerId,
		breed,
		age,
		gender,
		petName,
	} = req.body;

	const newSample = new Sample({
		customerName,
		sampleNo,
		samplingDate,
		sampleSubmittedBy,
		category,
		animal,
		customerId,
		breed,
		age,
		gender,
		petName,
	});

	// newSample
	//   .save()
	//   .then(() => res.json("Sample Added"))
	//   .catch((err) => {
	//     console.log(err);
	//     return res.status(400).json(err.message);
	//   });
	newSample.save(function (err, obj) {
		if (err) return res.status(400).json(err.message);

		res.json({ message: "Sample added!", data: obj });
	});
});
//route to find sample from customer id
router.get("/find/:id", isStaff, (req, res) => {
	Sample.find({ customerId: req.params.id })
		.then((sample) => res.json(sample))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.put("/update/:id", isStaff, (req, res) => {
	// const fields = Object.keys(req.body);

	// Sample.findByIdAndUpdate(req.params.id)
	// 	.then((sample) => {
	// 		fields.forEach((field) => {
	// 			sample[field] = req.body[field];
	// 		});

	// 		sample
	// 			.save()
	// 			.then(() => res.json('Sample Updated'))
	// 			.catch((err) => res.status(400).json('Error:' + err));
	// 	})
	// 	.catch((err) => res.status(400).json('Error:' + err));

	Sample.findByIdAndUpdate(
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

router.delete("/delete/:id", isStaff, (req, res) => {
	Sample.findByIdAndDelete(req.params.id)
		.then((sample) => res.json(sample))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.get("/search/:query", (req, res) => {
	const term = RegExp(`${req.params.query}`);
	Sample.find({
		$expr: {
			$regexMatch: {
				input: "$petName",
				regex: term, //Your text search here
				options: "i",
			},
		},
	})
		.then((customers) => res.json(customers))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.get("/paginate", (req, res) => {
	let page = req.query.page;
	let limit = req.query.limit;

	const options = {
		offset: page ? page * limit : 0,
		limit: limit ? limit : 20,
		sort: { createdAt: -1 },
	};

	Sample.paginate({ status: false }, options, (err, result) => {
		if (err) {
			return res.status(400).json({ message: err });
		}
		res.json({ rows: result.docs, total: result.totalDocs });
	});
});

module.exports = router;
