
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ProductsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  sku: {
    type: String
  },
  barCode: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  location: [{
    type: String,
    require: true
  }],
  discount: {
    type: Number,
    default: 0
  },
  models: [{
    type: Schema.Types.ObjectId,
    ref: "models"
  }],
  services: [{
    type: Schema.Types.ObjectId,
    ref: "services"
  }],
  combo: [{
    type: Schema.Types.ObjectId,
    ref: "Combo"
  }],
  category: [{
    type: Schema.Types.ObjectId,
    ref: "categories"
  }],
  warehouseId: {
    type: Schema.Types.ObjectId,
    ref: "warehouse"
  },
  images: [],
  description: {
    type: String,

  },
  attributes: {
    type: Object
  },
  sold: {
    type: Number,
    required: false,
    default: 0
  },
  unit: {
    type: String,
    require: true,
  },
  weight: {
    type: String
  },
  costPrice: {
    type: String
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  }


},
  { timestamps: true },

)

module.exports = mongoose.model("products", ProductsSchema)