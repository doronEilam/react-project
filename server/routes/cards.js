const express = require("express");
const router = express.Router();
const {
  getAllCards,
  getMyCards,
  getSingleCard,
  createNewCard,
  updateCard,
  deleteCard,
  likeUnlikeCard,
} = require("../controllers/adsController");

// Get all cards
router.get("/", getAllCards);

// Get my cards
router.get("/my-ads", getMyCards);

// Get single card
router.get("/:id", getSingleCard);

// Create new card
router.post("/", createNewCard);

// Update card
router.put("/:id", updateCard);

// Delete card
router.delete("/:id", deleteCard);

// Like/unlike card
router.patch("/:id", likeUnlikeCard);

module.exports = router;
