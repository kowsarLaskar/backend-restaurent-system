const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCategoryController,
  getAllCategoriesController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");

const router = express.Router();

// Create Category
router.post("/create", authMiddleware, createCategoryController);

// Get All Categories
router.get("/all", authMiddleware, getAllCategoriesController);

// Update category
router.put("/update/:id", authMiddleware, updateCategoryController);

// Delete category
router.delete("/delete/:id", authMiddleware, deleteCategoryController);

// export
module.exports = router;
