const categorySchema = require("../models/categoryModel");

// Create Category controller
const createCategoryController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    // validation
    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Category name is required",
      });
    }
    const category = new categorySchema({ title, imageUrl });
    await category.save();
    return res.status(201).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in creating category",
      error,
    });
  }
};

// Get All Categories controller
const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await categorySchema.find({});
    return res.status(200).send({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting categories",
      error,
    });
  }
};

// update
const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    const category = await categorySchema.findByIdAndUpdate(
      id,
      { title, imageUrl },
      { new: true },
    );
    return res.status(200).send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in updating category",
      error,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categorySchema.findByIdAndDelete(id);
    return res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in deleting category",
      error,
    });
  }
};

// Export
module.exports = {
  createCategoryController,
  getAllCategoriesController,
  updateCategoryController,
  deleteCategoryController,
};
