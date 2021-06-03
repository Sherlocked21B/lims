const express = require("express");
router = express.Router();

const Result = require("../model/Result");

router.get("/", (req, res) => {
	Result.find()
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.post("/add", (req, res) => {
	const { result, sampleId, Remarks } = req.body;

	const newResult = new Result({
		result,
		sampleId,
		Remarks,
	});

	newResult
		.save()
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.get("/:id", (req, res) => {
	Result.findById(req.params.id)
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.put("/update/:id", (req, res) => {
	Result.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
		if (err) {
			return res.status(400).json({ message: err });
		}
		res.json(doc);
	});
});

router.delete("/delete/:id", (req, res) => {
	Result.findByIdAndDelete(req.params.id)
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.get("/sample/:id", (req, res) => {
	Result.find({ sampleId: req.params.id })
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
