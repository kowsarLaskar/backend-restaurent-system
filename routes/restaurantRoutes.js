const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  getAllRestaurantsController,
  getRestaurantByIdController,
  deleteRestaurantController,
} = require("../controllers/restaurantController");

const router = express.Router();

// Create Restaurant
router.post("/create", authMiddleware, createRestaurantController);

// Get All Restaurants
router.get("/get-all", authMiddleware, getAllRestaurantsController);

// Get restaurant by ID
router.get("/get/:id", authMiddleware, getRestaurantByIdController);

// Delete Restaurant
router.delete("/delete/:id", authMiddleware, deleteRestaurantController);

module.exports = router;
