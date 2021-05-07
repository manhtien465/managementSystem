const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})

const querySchema = Joi.object({
  name: Joi.string().required()
})
let address = Joi.object().keys({
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  district: Joi.string().optional(),
  state: Joi.string().optional(),
  phoneNumber: Joi.string().optional()
})
module.exports = {
  validateCreateUser: Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    gender: Joi.string().valid("male", "female", "other").optional(),
    phoneNumber: Joi.string().optional(),
    avatar: Joi.string().optional(),
    addresses: Joi.array().items(address),
    totalMoneySpend: Joi.number().min(0)
  }),
  validateUpdateUser: Joi.object({
    firstname: Joi.string().optional(),
    lastname: Joi.string().optional(),
    password: Joi.string().optional(),
    email: Joi.string().email().optional(),
    isBan: Joi.boolean().optional(),
    gender: Joi.string().valid("male", "female", "other").optional(),
    phoneNumber: Joi.string().optional(),
    avatar: Joi.string().optional(),
    addresses: Joi.array().items(address),
    totalMoneySpend: Joi.number().min(0)
  }),

}