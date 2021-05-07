const mongoose = require("mongoose");
const Schema = mongoose.Schema
const OrdersSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "products"
  },
  attributes: {
    type: Object
  },
  number: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },

  address: {
    type: String,
  },

  phoneNumber: {
    type: Number,
  },

  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["PENDING", "SHIPPING", "CANCEL", "FINISH"],
    default: "PENDING",
  },
  phoneNumber: {
    type: String,
    require: true
  }
}, { timestamps: true })
const order = mongoose.model("orders", OrdersSchema)
module.exports = order