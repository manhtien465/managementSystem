const Joi = require('joi')


module.exports = {
  validateCreateProduct: Joi.object({
    name: Joi.string().required(),
    sku: Joi.string().required(),
    barCode: Joi.string().required(),
    price: Joi.number().min(0).required(),
    location: Joi.array().optional(),
    discount: Joi.number().optional(),
    models: Joi.array().items({
      sku: Joi.string().required(),
      name: Joi.string().required(),
      barCode: Joi.string().required(),
      price: Joi.number().min(0).required()
    }).optional(),
    category: Joi.array().optional(),
    image: Joi.array().optional(),
    description: Joi.string().optional(),
    attribute: Joi.object().optional(),
    unit: Joi.string().optional(),
    weight: Joi.string().optional(),
    costPrice: Joi.string().require(),
    quantity: Joi.Number().require()
  }),
  validateUpdateProduct: Joi.object({
    name: Joi.string().optional(),
    sku: Joi.string().optional(),
    barCode: Joi.string().optional(),
    price: Joi.number().min(0).optional(),
    location: Joi.array().optional(),
    discount: Joi.number().optional(),
    models: Joi.array().items({
      sku: Joi.string().optional(),
      name: Joi.string().required(),
      barCode: Joi.string().optional(),
      price: Joi.number().min(0).optional()
    }).optional(),
    category: Joi.array().optional(),
    image: Joi.array().optional(),
    description: Joi.string().optional(),
    attribute: Joi.object().optional(),
    unit: Joi.string().optional(),
    weight: Joi.string().optional(),
    costPrice: Joi.string().require(),
    quantity: Joi.Number().require()
  }),
}