const express = require('express');
const router = express.Router();
const controller = require('../controllers/BudgetController');

router.get('/:userId', controller.getBudget);
router.post('/', controller.addBudget);
router.delete('/:id', controller.deleteBudget);

// ✅ Update route
router.put('/:id', controller.updateBudget);

module.exports = router;
    