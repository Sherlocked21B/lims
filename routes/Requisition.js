const express = require("express");
router = express.Router();

const Requisition = require("../model/Requisition");

router.get("/", (req, res) => {
	let page = req.query.page;
	let limit = req.query.limit;

	const options = {
		offset: page ? page * limit : 0,
		limit: limit ? limit : 20,
	};

	Requisition.paginate({}, options, (err, result) => {
		if (err) {
			return res.status(400).json({ message: err });
		}
		res.json({ rows: result.docs, total: result.totalDocs, page: result.page });
	});
});

router.post("/add", (req, res) => {
	const { request } = req.body;

	const newResult = new Requisition({
		request,
	});

	newResult
		.save()
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.get("/:id", (req, res) => {
	Requisition.findById(req.params.id)
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json("Error:" + err));
});

router.put("/update/:id", (req, res) => {
	Requisition.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
		if (err) {
			return res.status(400).json({ message: err });
		}
		res.json(doc);
	});
});

router.get("/search/date", (req, res) => {
	let date = req.query.date;
	let page = req.query.page;
	let limit = req.query.limit;

	const options = {
		offset: page ? page * limit : 0,
		limit: limit ? limit : 20,
		sort: { createdAt: -1 },
	};

	Requisition.paginate({ created_at: date }, options, (err, result) => {
		if (err) {
			return res.status(400).json({ message: err });
		}
		res.json({ rows: result.docs, total: result.totalDocs });
	});
});

router.delete("/delete/:id", (req, res) => {
	Requisition.findByIdAndDelete(req.params.id)
		.then((result) => res.json(result))
		.catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
