const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ServicesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }

},
  { timestamps: true },
)
ItemSchema.index({ name: 'text', desc: 'text' })



const Items = mongoose.model("items", ItemSchema)
module.exports = Items