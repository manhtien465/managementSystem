
const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ProductsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  services: [{
    type: Schema.Types.ObjectId,
    ref: "Services"
  }],
  combo: [{
    type: Schema.Types.ObjectId,
    ref: "combo"
  }],
  category: [{
    type: Schema.Types.ObjectId,
    ref: "categories"
  }],
  images: [],
  desccription: {
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

  stock: {
    type: Number,
    required: true,
    default: 0
  }


},
  { timestamps: true },

)

module.exports = ProductsSchema