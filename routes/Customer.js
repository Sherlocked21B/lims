const express = require("express");
router = express.Router();
//Importing Schema
const Customer = require("../model/Customer");

router.get("/", (req, res) => {
  Customer.find()
    .then((customer) => res.json(customer))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.post("/add", (req, res) => {
  const { firstName, lastName, age, address, gender, contactNumber } = req.body;

  const newCustomer = new Customer({
    firstName,
    lastName,
    age,
    address,
    gender,
    contactNumber,
  });

  newCustomer
    .save()
    .then(() => res.json("Customer Added"))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.get("/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((customer) => res.json(customer))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.put("/update/:id", (req, res) => {
  Customer.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    res.json(doc);
  });
});

router.delete("/delete/:id", (req, res) => {
  Customer.findByIdAndDelete(req.params.id)
    .then((customer) => res.json(customer))
    .catch((err) => res.status(400).json("Error:" + err));
});

router.get("/search/:query", (req, res) => {
  const term = RegExp(`${req.params.query}`);
  Customer.find({
    $expr: {
      $regexMatch: {
        input: { $concat: ["$firstName", " ", "$lastName"] },
        regex: term, //Your text search here
        options: "i",
      },
    },
  })
    .then((customers) => res.json(customers))
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
