
const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ModelsSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "products"
  },
  sku: {
    type: String,
    require: true
  },
  barCode: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  warehouse: {
    type: Schema.Types.ObjectId,
    ref: "warehouse"
  },



},
  { timestamps: true },

)


const Models = mongoose.model("models", ModelsSchema)
module.exports = Models;