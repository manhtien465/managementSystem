const mongoose = require("mongoose");
const Schema = mongoose.Schema
const ServicesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  productId: {
    type: Schema.Types.ObjectId
  }

},
  { timestamps: true },
)



const Items = mongoose.model("services", ServicesSchema)
module.exports = Items