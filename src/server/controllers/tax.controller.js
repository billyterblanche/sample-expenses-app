const Tax = require("../models/tax.model.js");

// Retrieve all from the database.
module.exports.findAll = (req, res) => {
    Tax.get((err, data) => {
      if (err) {
        res.status(500).send({ message: err.message || "An error occurred while retrieving tax information." });
      } else {
        res.send(data);
      }
  });
};