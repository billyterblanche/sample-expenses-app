const jwt = require('jsonwebtoken');

const Expense = require("../models/expense.model.js");
const JwtSecret = require('../../environments/secrets');

module.exports.findAll = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token, JwtSecret.secret);

    const expense = new Expense({ userId: payload.sub });
    expense.findAll((expenses) => {
      res.status(200)
      .json({
        expenses
      });
    });
  };
  
  module.exports.create = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token, JwtSecret.secret);

    const model = {
        taxId,
        value,
        description,
        dateOfExpense,
        taxId
    } = req.body;
    model.userId = payload.sub;

    const expense = new Expense(model);
    expense.create((id) => {
      res.status(201)
      .json({ id: id });
    });
  };
  
  module.exports.update = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token, JwtSecret.secret);

    const model = {
        value,
        description,
        dateOfExpense,
        taxId
    } = req.body;
    model.id = req.params.id;
    model.userId = payload.sub;

    const expense = new Expense(model);
    expense.update(() => {
      res.status(204)
      .json();
    });
  };
  
  module.exports.delete = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decode(token, JwtSecret.secret);
    
    const model = {
      id: req.params.id,
      userId: payload.sub
    };

    const expense = new Expense(model);
    expense.delete(() => {
      res.status(204)
      .json();
    });
  };