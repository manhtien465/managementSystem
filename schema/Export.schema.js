const mongoose = require('mongoose')

const Schema = mongoose.Schema;
var ExportSchema = new Schema({

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
    collection: "Exports"
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);



module.exports = mongoose.model('Exports', ExportSchema);