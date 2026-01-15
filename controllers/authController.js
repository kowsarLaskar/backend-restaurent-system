const userModel = require("../models/userModel");

// REGISTER CONTROLLER
const registerController = async (req, res) => {
  try {
    const { username, email, password, address, phoneNumber } = req.body;
    // validation
    if (!username || !email || !password || !phoneNumber) {
      return res.status(400).send({
        success: false,
        message: "Please fill all required fields",
      });
    }
    // existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }
    // register user
    const user = await new userModel({ username, email, password, address, phoneNumber }).save();
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });


  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
}

module.exports = { registerController };