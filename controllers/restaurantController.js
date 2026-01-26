const restaurantModel = require("../models/restaurantModel");

// Create Restaurant
const createRestaurantController = async (req, res) => {
  try {
    const {
      name,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrls,
      rating,
      code,
      coordinates,
    } = req.body;

    // validation
    if (
      !name ||
      !imageUrl ||
      !foods ||
      !time ||
      !logoUrls ||
      !code ||
      !coordinates
    ) {
      return res.status(400).send({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const restaurant = new restaurantModel({
      name,
      imageUrl,
      foods,
      time,
      pickUp: pickup,
      delivery,
      isOpen,
      logoUrls,
      rating,
      code,
      coordinates,
    });
    await restaurant.save();
    return res.status(201).send({
      success: true,
      message: "Restaurant created successfully",
      restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in creating restaurant",
      error,
    });
  }
};

// Get All Restaurants controllers
const getAllRestaurantsController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "No restaurants found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "All restaurants fetched successfully",
      restaurants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting restaurants",
      error,
    });
  }
};

// Get Restaurant by ID controller
const getRestaurantByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await restaurantModel.findById(id);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Succesful",
      restaurant,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting restaurant by ID",
      error,
    });
  }
};

// Delete Restaurant controller
const deleteRestaurantController = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await restaurantModel.findByIdAndDelete(id);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }
    await restaurantModel.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in deleting restaurant",
      error,
    });
  }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantsController,
  getRestaurantByIdController,
  deleteRestaurantController,
};
