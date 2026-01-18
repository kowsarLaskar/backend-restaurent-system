const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

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

    // hashing password
    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

    // register||create user
    const user = await new userModel({ username, email, password: hashedPassword, address, phoneNumber }).save();
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

// LOGIN CONTROLLER
const loginController = async (req, res) => {
  // Login logic will go here
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email and password"
      });
    }

    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered"
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid password"
      });
    }

    // jwt token
    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    user.password = undefined; // Hide password in response
    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
}

module.exports = { registerController, loginController };