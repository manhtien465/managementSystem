const mongoose = require('mongoose')

const Schema = mongoose.Schema;
var ImportSchema = new Schema({

  productId: {
    type: Schema.Types.ObjectId,
    ref: "products"
  },
  quantity: {
    type: Number,
    require: true
  }
},
  {
    timestamps: true,
  },
  {
    collection: "Imports"
  }
);



module.exports = mongoose.model('Imports', ImportSchema);