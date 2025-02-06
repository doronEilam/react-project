const cardSchema = require("../models/card");
const cardSchemaValidator = require("../validators/cardValidator");

const getAllCards = (req, res) => {
  // Logic to get all cards
  res.send("Get all cards");
};

const getMyCards = (req, res) => {
  // Logic to get my cards
  res.send("Get my cards");
};

const getSingleCard = (req, res) => {
  // Logic to get a single card by ID
  res.send(`Get card with ID ${req.params.id}`);
};

const createNewCard = async (req, res) => {
  try {
    const newCard = new cardSchema({
      ...req.body,
    });
    const card = await newCard.save();
    res.status(201).json({
      status: 201,
      message: "Card created successfully",
      data: card,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
  // Logic to create a new card
};

const updateCard = (req, res) => {
  // Logic to update a card by ID
  res.send(`Update card with ID ${req.params.id}`);
};

const deleteCard = (req, res) => {
  // Logic to delete a card by ID
  res.send(`Delete card with ID ${req.params.id}`);
};

const likeUnlikeCard = (req, res) => {
  // Logic to like/unlike a card by ID
  res.send(`Like/unlike card with ID ${req.params.id}`);
};

module.exports = {
  getAllCards,
  getMyCards,
  getSingleCard,
  createNewCard,
  updateCard,
  deleteCard,
  likeUnlikeCard,
};
