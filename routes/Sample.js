const express = require("express");
router = express.Router();
//Importing Schema
const Sample = require("../model/Sample");

router.get("/", (req, res) => {
  Sample.find()
    .then((sample) => res.json(sample))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.post("/add", (req, res) => {
  // const number = req.body.name;
  // const dueDate = Date(req.body.dueDate);
  // const collectedBy = req.body.collectedBy;
  // const paymentStatus = Boolean(req.body.paymentStatus);
  // const testName = req.body.testName;
  // const status = Boolean(req.body.status);
  // const reagent = req.body.reagent;
  // const userId = req.body.userId;

  //auto conversion of date json to iso(mongo date formate) and json has boolean value .i.e true and false so no need to typecast using Boolean

  const {
    sampleNo,
    dueDate,
    collectedBy,
    paymentStatus,
    testName,
    customerId,
  } = req.body;

  const newSample = new Sample({
    sampleNo,
    dueDate,
    collectedBy,
    paymentStatus,
    testName,
    customerId,
  });

  // newSample
  //   .save()
  //   .then(() => res.json("Sample Added"))
  //   .catch((err) => {
  //     console.log(err);
  //     return res.status(400).json(err.message);
  //   });
  newSample.save(function (err, obj) {
    if (err) return res.status(400).json(err.message);

    res.json({ message: "Sample added!", data: obj });
  });
});

router.get("/:id", (req, res) => {
  Sample.findById(req.params.id)
    .then((sample) => res.json(sample))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.put("/update/:id", (req, res) => {
  // const fields = Object.keys(req.body);

  // Sample.findByIdAndUpdate(req.params.id)
  // 	.then((sample) => {
  // 		fields.forEach((field) => {
  // 			sample[field] = req.body[field];
  // 		});

  // 		sample
  // 			.save()
  // 			.then(() => res.json('Sample Updated'))
  // 			.catch((err) => res.status(400).json('Error:' + err));
  // 	})
  // 	.catch((err) => res.status(400).json('Error:' + err));

  Sample.findByIdAndUpdate(
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
  Sample.findByIdAndDelete(req.params.id)
    .then((sample) => res.json(sample))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
