const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  deleteUserController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

// UPDATE USER || PUT
router.put("/updateUser", authMiddleware, updateUserController);

// Update PASSWORD || POST
router.post("/updatePassword", authMiddleware, updatePasswordController);

// DELETE USER || DELETE
router.delete("/deleteUser/:id", authMiddleware, deleteUserController);

module.exports = router;
