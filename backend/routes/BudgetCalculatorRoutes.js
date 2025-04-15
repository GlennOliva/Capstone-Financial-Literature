const express = require('express');
const router = express.Router();
const controller = require('../controllers/BudgetCalculatorController');

router.get('/:userId', controller.getBudgetCalculator);
router.post('/', controller.addBudgetCalculator);
router.delete('/:id', controller.deleteBudgetCalculator);

// ✅ Update route
router.put('/:id', controller.updateBudgetCalculator);

module.exports = router;
    