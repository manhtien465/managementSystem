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