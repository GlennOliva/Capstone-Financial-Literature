const express = require('express');
const router = express.Router();
const controller = require('../controllers/CategoryController');

router.get('/:userId', controller.getCategory);
router.post('/', controller.addCategory);
router.delete('/:id', controller.deleteCategory);

// ✅ Update route
router.put('/:id', controller.updateCategory);

module.exports = router;
    