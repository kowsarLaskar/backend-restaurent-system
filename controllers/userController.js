const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');

// GET USER INFO
const getUserController = async (req, res) => {

  try {
    const user = await userModel.findById({ _id: req.user.id });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    user.password = undefined; // Exclude password from response

    res.status(200).send({
      success: true,
      message: "User data fetched successfully",
      data: user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in fetching user data",
      error: error.message,
    });
  }
};

// UPDATE USER INFO
const updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.user.id });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    // Update user 
    const { username, address, phoneNumber } = req.body;
    if (username) user.username = username;
    if (address) user.address = address;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    //  save
    await user.save();
    res.status(200).send({
      success: true,
      message: "User data updated successfully",
      data: user,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating user data",
      error: error.message,
    });
  }
};

// reset password
const updatePasswordController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.user.id });
    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        success: false,
        message: "Please provide old and new password"
      });
    }
    // check password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid old password"
      });
    }

    // hashing password
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating password",
      error: error.message,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController
};