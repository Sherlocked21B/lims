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
    }
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
    }
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
    }
  );
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
