const authServices = require("../services/authServices");
class AuthControllers {
  async register(req, res) {
    try {
      const userData = {
        ...req.body,
        email: req.body.email.toLowerCase(),
      };
      console.log(userData);

      const token = await authServices.register(userData);

      res.status(201).json({
        status: 201,
        message: "User registered successfully",
        token,
      });
    } catch (error) {
      if (error === "Invalid password" || error === "Invalid email") {
        return res.status(400).json({
          status: 400,
          message: error,
        });
      }
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
  async login(req, res) {
    try {
      const userData = req.body;
      console.log(userData);
      const token = await authServices.login(userData);

      res.status(201).json({
        status: 201,
        message: "User logged in successfully",
        token,
      });
    } catch (error) {
      if (error === "User not found") {
        return res.status(404).json({
          status: 404,
          message: "User not found",
        });
      }
      if (error === "Invalid password") {
        return res.status(401).json({
          status: 401,
          message: "Invalid password",
        });
      }
      res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }
}
module.exports = new AuthControllers();
