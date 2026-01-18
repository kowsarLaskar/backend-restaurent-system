const express = require('express');
const { getUserController, updateUserController, updatePasswordController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { updateMany } = require('../models/userModel');
const router = express.Router();

// GET USER || GET
router.get('/getUser', authMiddleware, getUserController);

// UPDATE USER || PUT
router.put('/updateUser', authMiddleware, updateUserController);

// Update PASSWORD || POST
router.post('/updatePassword', authMiddleware, updatePasswordController)

module.exports = router;