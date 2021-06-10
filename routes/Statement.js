const express = require("express");
router = express.Router();

const Statement = require("../model/Statement");

router.get("/", (req, res) => {
	Statement.find()
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.post("/add", (req, res) => {
	const { customerName, petName, sampleId, sampleNo, amount } = req.body;

	const newStatement = new Statement({
		customerName,
		sampleId,
		petName,
		sampleNo,
		amount,
	});

	newStatement
		.save()
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json("Error:" + err));
});
router.get("/sample/", (req, res) => {
	let sampleNo = req.query.sampleNo;
	Statement.find({ sampleNo: sampleNo })
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.get("/find", (req, res) => {
	let customer = req.query.customerName;
	let pet = req.query.petName;
	let startDate = req.query.startDate;
	let endDate = req.query.endDate;

	let option = customer
		? pet
			? { petName: new RegExp(`^${pet}$`, 'i'), customerName: customer }
			: { customerName: customer }
		: pet
		? { petName: new RegExp(`^${pet}$`, 'i') }
		: {};

	let end = new Date(endDate);
	Statement.find(
		{
			...option,
			createdAt: {
				$gte: new Date(startDate).toISOString(),
				$lt: new Date(end.setDate(end.getDate() + 1)).toISOString(),
			},
		},
		{ sort: [['createdAt', 'asc']] }
	)
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.get("/:id", (req, res) => {
	Statement.findById(req.params.id)
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.put("/update/:id", (req, res) => {
	Statement.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
		if (err) {
			return res.status(400).json({ message: err });
		}
		res.json(doc);
	});
});

router.delete("/delete/:id", (req, res) => {
	Statement.findByIdAndDelete(req.params.id)
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
