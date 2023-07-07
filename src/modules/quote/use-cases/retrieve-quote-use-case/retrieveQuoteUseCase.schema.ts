import Joi from "joi";

export const retrieveQuoteUseCaseSchema = Joi.object({
  recipient: Joi.object({
    address: Joi.object({
      zipcode: Joi.string().required(),
    }).required(),
  }).required(),
  volumes: Joi.array()
    .items(
      Joi.object({
        category: Joi.number().required(),
        amount: Joi.number().required(),
        unitary_weight: Joi.number().required(),
        price: Joi.number().required(),
        sku: Joi.string().optional(),
        height: Joi.number().required(),
        width: Joi.number().required(),
        length: Joi.number().required(),
      }).required()
    )
    .required(),
});
