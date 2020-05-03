const express = require('express');
const jwt = require('express-jwt');
const router = express.Router();

const authenticationController = require('../controllers/authentication.controller');
const taxController = require('../controllers/tax.controller');
const expensesController = require('../controllers/expenses.controller');
const JwtSecret = require('../../environments/secrets');

const authentication = jwt({
  secret: JwtSecret.secret,
  userProperty: 'payload'
});

router.get('/tax', authentication, taxController.findAll);
router.get('/expenses', authentication, expensesController.findAll);
router.post('/expenses', authentication, expensesController.create);
router.put('/expenses/:id', authentication, expensesController.update);
router.delete('/expenses/:id', authentication, expensesController.delete);

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);

module.exports = router;