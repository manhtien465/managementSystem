const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var ComboSchema = new Schema({
  name: {
    type: String,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "products"
  },
  quantity: {
    type: Number,
    require: true,
    default: 1
  },
  price: {
    type: Number,
    require: true
  }

},
  {
    timestamps: true,
  },
  {
    collection: "Combo"
  }
);

module.exports = mongoose.model('Combo', ComboSchema);