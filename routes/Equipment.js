const express = require("express");
router = express.Router();
//Importing Schema
const { Equipment } = require("../model/Equipment");
const isInventoryManager = require("../middlewares/isInventoryManager");

router.get("/", (req, res) => {
	let page = req.query.page;
	let limit = req.query.limit;

	const options = {
		offset: page ? page * limit : 0,
		limit: limit ? limit : 20,
		sort: { volume: 1 },
	};

	Equipment.paginate({}, options, (err, result) => {
		if (err) {
			return res.status(400).json({ message: err });
		}
		res.json({ rows: result.docs, total: result.totalDocs, page: result.page });
	});
});

router.post("/add", isInventoryManager, (req, res) => {
	//auto conversion from string to number by mongoose

	const { equipmentName, description, quantity } = req.body;

	const newEquipment = new Reagent({
		equipmentName,
		description,
		quantity,
	});

	newEquipment.save(function (err, obj) {
		if (err) return res.status(400).json(err.message);

		res.json({ message: "Equipment added!", data: obj });
	});
});

router.get("/:id", isInventoryManager, (req, res) => {
	Equipment.findById(req.params.id)
		.then((equipment) => res.json(equipment))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.put("/update/:id", isInventoryManager, (req, res) => {
	Equipment.findByIdAndUpdate(
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

router.put("/import/:id", isInventoryManager, (req, res) => {
	Equipment.findByIdAndUpdate(
		req.params.id,
		{ $inc: { volume: req.body.volume } },
		(err, doc) => {
			if (err) {
				return res.status(400).json({ message: err });
			}
			res.json("Equipment Imported");
		},
	);
});

router.put("/use/:id", isInventoryManager, (req, res) => {
	Equipment.findByIdAndUpdate(
		req.params.id,
		{ $inc: { volume: -req.body.volume } },
		(err, doc) => {
			if (err) {
				return res.status(400).json({ message: err });
			}
			res.json("Equipment Used");
		},
	);
});

router.get("/search/:query", (req, res) => {
	const term = RegExp(`${req.params.query}`);
	Equipment.find({
		$expr: {
			$regexMatch: {
				input: "$equipmentName",
				regex: term, //Your text search here
				options: "i",
			},
		},
	})
		.then((equipments) => res.json(equipments))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.delete("/delete/:id", isInventoryManager, (req, res) => {
	Equipment.findByIdAndDelete(req.params.id)
		.then((equipment) => res.json(equipment))
		.catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
