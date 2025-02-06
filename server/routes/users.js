const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  getMyProfile,
  updateUser,
  deleteUser,
} = require("../controllers/usersController");

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

// Get my profile
router.get("/profile/me", getMyProfile);

// Update user
router.put("/:id", updateUser);

// Delete user
router.delete("/:id", deleteUser);

module.exports = router;
