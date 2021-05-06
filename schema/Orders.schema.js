const mongoose = require("mongoose");
const Schema = mongoose.Schema
const OrdersSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "products"
  },
  number: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  addresses: {
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    district: {
      type: String
    },
    state: {
      type: String
    },
    phoneNumber: {
      type: Number,
    }
  },
  totalPrice: {
    type: Number,
    required: true
  },
  phoneNumber: {
    type: String,
    require: true
  }
}, { timestamps: true })
const order = mongoose.model("orders", OrdersSchema)
module.exports = order