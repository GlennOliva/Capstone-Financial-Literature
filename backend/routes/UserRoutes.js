const express = require('express');
const router = express.Router();
const controller = require('../controllers/UserController');
const upload = require('../middlewares/upload'); // <-- ADD THIS
// 🟢 Register with image upload
router.post('/', upload.single('image'), controller.addUser);

// 🟢 Login
router.post('/login', controller.loginUser);

// 🟢 Get one user
router.get('/:userId', controller.getUser);

// 🟢 Update user
router.put('/:id', upload.single('image'), controller.updateUser);

module.exports = router;
