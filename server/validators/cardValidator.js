const Joi = require("joi");

// cardValidator.js

const cardSchemaValidator = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(256).required(),
  phone: Joi.string().min(9).max(10).required(),
  email: Joi.string().email().required(),
  web: Joi.string().required(),
  image: Joi.object({
    url: Joi.string().required(),
    alt: Joi.string().min(2).required(),
  }).required(),
  address: Joi.object({
    state: Joi.string(),
    country: Joi.string().required(),
    city: Joi.string().required(),
    street: Joi.string().required(),
    houseNumber: Joi.number().required(),
    zip: Joi.number(),
  }).required(),
});

module.exports = cardSchemaValidator;
