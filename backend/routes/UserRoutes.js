const express = require('express');
const router = express.Router();
const controller = require('../controllers/UserController');
const upload = require('../middlewares/upload'); // <-- ADD THIS
// 🟢 Register with image upload
router.post('/register', upload.single('image'), controller.addUser);

    // 🟢 Login
    router.post('/login', controller.loginUser);

    router.get('/:id', controller.getUserById); // 👈 this line

// 🟢 Update user
router.put('/:id', upload.single('image'), controller.updateUser);

module.exports = router;
