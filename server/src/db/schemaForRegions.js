const Joi = require('joi');

const schemaForRegions = Joi.object({
  dist: Joi.array().items(Joi.number())
    .min(1)
    .max(20)
    .required(),
});

module.exports = schemaForRegions;
