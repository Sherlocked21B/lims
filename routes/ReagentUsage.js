const express = require("express");
router = express.Router();
const ReagentUsage = require("../model/ReagentUsage");

router.get("/", (req, res) => {
	let testName = req.query.testName;
	let parameter = req.query.parameter;
	ReagentUsage.find({ testName: testName, parameter: parameter })
		.then((result) => res.json(result))
		.catch((err) => {
			console.log(err);
			res.status(400).send(err);
		});
});

router.post("/search", async (req, res) => {
	let list = req.body.list;
	const results = await Promise.all(
		list.map(async (item) => {
			try {
				const result = await ReagentUsage.find({
					testName: item.testName,
					parameter: item.parameter,
				});
				return result[0];
			} catch (error) {
				return res.status(500).json({ message: "Internal server error." });
			}
		}),
	);
	res.json(results);
});

router.post("/add", (req, res) => {
	const { testName, parameter, reagentTable } = req.body;

	const newReference = new ReagentUsage({
		testName,
		parameter,
		reagentTable,
	});

	newReference
		.save()
		.then((result) => res.json(result))
		.catch((err) =>
			res.status(400).json({ message: "Error occured", error: err }),
		);
});

router.get("/:id", (req, res) => {
	ReagentUsage.findById(req.params.id)
		.then((result) => res.json(result))
		.catch((err) =>
			res.status(400).json({ message: "Error occured", error: err }),
		);
});

router.get("/find/:parameter", (req, res) => {
	// let animal = req.query.animalName;
	ReagentUsage.find({ parameter: req.params.parameter })
		.then((result) => res.json(result))
		.catch((err) =>
			res.status(400).json({ message: "Error occured", error: err }),
		);
});

router.put("/update/:id", (req, res) => {
	ReagentUsage.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
		if (err) {
			return res.status(400).json({ message: "Error occured", error: err });
		}
		res.json(doc);
	});
});

router.delete("/delete/:id", (req, res) => {
	ReagentUsage.findByIdAndDelete(req.params.id)
		.then((result) => res.json(result))
		.catch((err) =>
			res.status(400).json({ message: "Error occured", error: err }),
		);
});

module.exports = router;
