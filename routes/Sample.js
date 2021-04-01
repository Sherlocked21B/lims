const express = require("express");
router = express.Router();
//Importing Schema
const Sample = require("../model/Sample");

router.get("/", (req, res) => {
	let page = req.query.page;
	let limit = req.query.limit;
	let sample = req.query.sampleId;
	let customer = req.query.Customer;
	let date = req.query.Date;

	let options = {
		offset: page ? page * limit : 0,
		limit: limit ? limit : 20,
		sort: { createdAt: -1 },
	};

	Sample.paginate(
		sample
			? { sampleNo: sample }
			: customer && date
			? { customerId: customer, created_at: date }
			: customer
			? { customerId: customer }
			: date
			? { created_at: date }
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

router.post("/add", (req, res) => {
	// const number = req.body.name;
	// const dueDate = Date(req.body.dueDate);
	// const collectedBy = req.body.collectedBy;
	// const paymentStatus = Boolean(req.body.paymentStatus);
	// const testName = req.body.testName;
	// const status = Boolean(req.body.status);
	// const reagent = req.body.reagent;
	// const userId = req.body.userId;

	//auto conversion of date json to iso(mongo date formate) and json has boolean value .i.e true and false so no need to typecast using Boolean

	const {
		customerName,
		sampleNo,
		dueDate,
		collectedBy,
		paymentStatus,
		testName,
		customerId,
	} = req.body;

	const newSample = new Sample({
		customerName,
		sampleNo,
		dueDate,
		collectedBy,
		paymentStatus,
		testName,
		customerId,
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
router.get("/find/:id", (req, res) => {
	Sample.find({ customerId: req.params.id })
		.then((sample) => res.json(sample))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.put("/update/:id", (req, res) => {
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

router.delete("/delete/:id", (req, res) => {
	Sample.findByIdAndDelete(req.params.id)
		.then((sample) => res.json(sample))
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
