const Joi = require('joi');

const schema = Joi.object({
  town: Joi.string()
    .min(3)
    .max(30)
    .required(),
  cabel: Joi.object({
    length: Joi.number(),
    amount: Joi.number(),
    empty: Joi.number(),
    busy: Joi.number(),
  }),
  location: Joi.array()
    .required(),
  atc: Joi.array(),

  address: Joi.object(),

  work: Joi.boolean(),
});

module.exports = schema;
