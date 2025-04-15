const express = require('express');
const router = express.Router();
const controller = require('../controllers/GoalController');

router.get('/:userId', controller.getGoal);
router.post('/', controller.addGoal);
router.delete('/:id', controller.deleteGoal);

// ✅ Update route
router.put('/:id', controller.updateGoal);

module.exports = router;
    