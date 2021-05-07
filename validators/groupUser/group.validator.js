const Joi = require('joi')



module.exports = {
  validateCreateGroup: Joi.object({
    name: Joi.string().required(),
    discount: Joi.number().min(0).required()
  }),
  validateUpdateGroup: Joi.object({
    name: Joi.string().optional(),
    discount: Joi.number().min(0).optional()
  }),
  validateDeleteGroup: Joi.string().length(24)
}