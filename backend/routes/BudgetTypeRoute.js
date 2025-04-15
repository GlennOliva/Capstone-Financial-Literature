const express = require('express');
const router = express.Router();
const controller = require('../controllers/BudgetTypeController');

router.get('/:userId', controller.getBudgetType);
router.post('/', controller.addBudgetType);
router.delete('/:id', controller.deleteBudgetType);

// ✅ Update route
router.put('/:id', controller.updateBudgetType);

module.exports = router;
    