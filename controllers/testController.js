const testUserController = (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Test user controller is working fine",
    });
  } catch (error) {
    console.log(error);

  }
}

module.exports = { testUserController };