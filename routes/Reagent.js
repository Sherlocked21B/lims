const express = require("express");
router = express.Router();
//Importing Schema
const { Reagent } = require("../model/Reagent");
const isInventoryManager = require("../middlewares/isInventoryManager");

router.get("/", (req, res) => {
	let page = req.query.page;
	let limit = req.query.limit;

	const options = {
		offset: page ? page * limit : 0,
		limit: limit ? limit : 20,
		sort: { volume: 1 },
	};

	Reagent.paginate({}, options, (err, result) => {
		if (err) {
			return res.status(400).json({ message: err });
		}
		res.json({ rows: result.docs, total: result.totalDocs, page: result.page });
	});
});

router.post("/add", isInventoryManager, (req, res) => {
	//auto conversion from string to number by mongoose

	const { reagentName, unit, volume, minimum } = req.body;

	const newReagent = new Reagent({
		reagentName,
		unit,
		volume,
		minimum,
	});

	newReagent.save(function (err, obj) {
		if (err) return res.status(400).json(err.message);

		res.json({ message: "Reagent added!", data: obj });
	});
});

router.get("/:id", isInventoryManager, (req, res) => {
	Reagent.findById(req.params.id)
		.then((reagent) => res.json(reagent))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.put("/update/:id", isInventoryManager, (req, res) => {
	Reagent.findByIdAndUpdate(
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
	Reagent.findByIdAndUpdate(
		req.params.id,
		{ $inc: { volume: req.body.volume } },
		(err, doc) => {
			if (err) {
				return res.status(400).json({ message: err });
			}
			res.json("Reagent Imported");
		},
	);
});

router.put("/use/:id", isInventoryManager, (req, res) => {
	Reagent.findByIdAndUpdate(
		req.params.id,
		{ $inc: { volume: -req.body.volume } },
		(err, doc) => {
			if (err) {
				return res.status(400).json({ message: err });
			}
			res.json("Reagent Used");
		},
	);
});

router.post("/find", async (req, res) => {
	let list = req.body.list;
	const results = await Promise.all(
		list.map(async (item) => {
			try {
				const result = await Reagent.find({
					reagentName: item.reagentName,
				});
				return result[0];
			} catch (error) {
				return res.status(500).json({ message: "Internal server error." });
			}
		}),
	);
	res.json(results);
});

router.post("/reduce/", isInventoryManager, async (req, res) => {
	const reagentList = req.body.reagentList;

	const err = await Promise.all(
		reagentList.map((item) => {
			try {
				Reagent.findOneAndUpdate(
					{ reagentName: item.reagentName },
					{ $inc: { volume: -item.volume } },
					(err, doc) => {
						if (err) {
							return true;
						} else {
							return false;
						}
					},
				);
			} catch (e) {
				return res.status(400).json({ message: "error occured" });
			}
		}),
	);
	const check = err.includes(true);
	if (check) {
		return res.status(400).json({ message: "error occured" });
	} else {
		res.json("successful");
	}
});

router.post("/increase/", isInventoryManager, async (req, res) => {
	const reagentList = req.body.reagentList;

	const err = await Promise.all(
		reagentList.map((item) => {
			try {
				Reagent.findOneAndUpdate(
					{ reagentName: item.reagentName },
					{ $inc: { volume: item.volume } },
					(err, doc) => {
						if (err) {
							return true;
						} else {
							return false;
						}
					},
				);
			} catch (e) {
				return res.status(400).json({ message: "error occured" });
			}
		}),
	);
	const check = err.includes(true);
	if (check) {
		return res.status(400).json({ message: "error occured" });
	} else {
		res.json("successful");
	}
});

router.get("/search/:query", (req, res) => {
	const term = RegExp(`${req.params.query}`);
	Reagent.find({
		$expr: {
			$regexMatch: {
				input: "$reagentName",
				regex: term, //Your text search here
				options: "i",
			},
		},
	})
		.then((customers) => res.json(customers))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.delete("/delete/:id", isInventoryManager, (req, res) => {
	Reagent.findByIdAndDelete(req.params.id)
		.then((reagent) => res.json(reagent))
		.catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
