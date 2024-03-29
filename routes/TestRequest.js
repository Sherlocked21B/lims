const express = require("express");
router = express.Router();
const TestRequest = require("../model/TestRequest");

router.get("/", (req, res) => {
	TestRequest.find()
		.then((result) => res.json(result))
		.catch((err) =>
			res.status(400).json({ message: "Error occured", error: err }),
		);
});

router.post("/add", (req, res) => {
	const {
		customerId,
		customerName,
		sampleId,
		testFee,
		means,
		sampleType,
		toTest,
		animalName,
	} = req.body;

	const newTestRequest = new TestRequest({
		customerId,
		customerName,
		sampleId,
		testFee,
		means,
		sampleType,
		toTest,
		animalName,
	});

	newTestRequest
		.save()
		.then((result) => res.json(result))
		.catch((err) =>
			res.status(400).json({ message: "Error occured", error: err }),
		);
});

router.get("/:id", (req, res) => {
	TestRequest.findById(req.params.id)
		.then((result) => res.json(result))
		.catch((err) =>
			res.status(400).json({ message: "Error occured", error: err }),
		);
});

router.get("/find/:id", (req, res) => {
	TestRequest.find({ sampleId: req.params.id })
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.put("/update/:id", (req, res) => {
	TestRequest.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
		(err, doc) => {
			if (err) {
				return res.status(400).json({ message: "Error occured", error: err });
			}
			res.json(doc);
		},
	);
});

router.delete("/delete/:id", (req, res) => {
	TestRequest.findByIdAndDelete(req.params.id)
		.then((result) => res.json(result))
		.catch((err) =>
			res.status(400).json({ message: "Error occured", error: err }),
		);
});

module.exports = router;
