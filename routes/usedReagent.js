const express = require("express");
router = express.Router();
//Importing Schema
const UsedReagent = require("../model/UsedReagent");

router.get("/", (req, res) => {
	UsedReagent.find()
		.then((usedReagent) => res.json(usedReagent))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.post("/add", (req, res) => {
	const { sampleNo, sampleId, usedReagent } = req.body;

	const newUsedReagent = new UsedReagent({
		sampleNo,
		sampleId,
		usedReagent,
	});

	newUsedReagent
		.save()
		.then((reagent) =>
			res.json({ reagent: reagent, message: "Reagent saved successfully" }),
		)
		.catch((err) => res.status(400).json("Error:" + err));
});

router.get("/:id", (req, res) => {
	UsedReagent.findById(req.params.id)
		.then((usedReagent) => res.json(usedReagent))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.get("/find/:id", (req, res) => {
	UsedReagent.find({ sampleId: req.params.id })
		.then((reagents) => res.json(reagents))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.put("/update/:id", (req, res) => {
	UsedReagent.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
		if (err) {
			return res.status(400).json({ message: err });
		}
		res.json(doc);
	});
});

router.delete("/delete/:id", (req, res) => {
	UsedReagent.findByIdAndDelete(req.params.id)
		.then((reagent) => res.json(reagent))
		.catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
