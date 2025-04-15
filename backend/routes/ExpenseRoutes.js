const express = require('express');
const router = express.Router();
const controller = require('../controllers/ExpenseController');

router.get('/:userId', controller.getExpenses);
router.post('/', controller.addExpense);
router.delete('/:id', controller.deleteExpense);

// ✅ Update route
router.put('/:id', controller.updateExpense);

module.exports = router;
