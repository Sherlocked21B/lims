const express = require("express");
router = express.Router();
//Importing Schema
const { Reagent } = require("../model/Reagent");

router.get("/", (req, res) => {
  let page = req.query.page;
  let limit = req.query.limit;

  const options = {
    offset: page ? page * limit : 0,
    limit: limit ? limit : 20,
    sort: { createdAt: -1 },
  };

  Reagent.paginate({}, options, (err, result) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    res.json({ rows: result.docs, total: result.totalDocs, page: result.page });
  });
});

router.post("/add", (req, res) => {
  // const name = req.body.name;
  // const unit = req.body.unit;
  // const volume = Number(req.body.volume);

  //auto conversion from string to number by mongoose

  const { reagentName, unit, volume } = req.body;

  const newReagent = new Reagent({
    reagentName,
    unit,
    volume,
  });

  newReagent.save(function (err, obj) {
    if (err) return res.status(400).json(err.message);

    res.json({ message: "Reagent added!", data: obj });
  });
});

router.get("/:id", (req, res) => {
  Reagent.findById(req.params.id)
    .then((reagent) => res.json(reagent))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.put("/update/:id", (req, res) => {
  // const fields = Object.keys(req.body);

  // Reagent.findByIdAndUpdate(req.params.id)
  // 	.then((reagent) => {
  // 		fields.forEach((field) => {
  // 			reagent[field] = req.body[field];
  // 		});

  // 		reagent
  // 			.save()
  // 			.then(() => res.json('Reagent Updated'))
  // 			.catch((err) => res.status(400).json('Error:' + err));
  // 	})
  // 	.catch((err) => res.status(400).json('Error:' + err));

  Reagent.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, doc) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
      res.json(doc);
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  Reagent.findByIdAndDelete(req.params.id)
    .then((reagent) => res.json(reagent))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
