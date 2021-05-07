const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var WarehouseSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  desc: {
    type: String
  },
  address: {
    type: String,
    require: true,
  }

},
  {
    timestamps: true,
  },
  {
    collection: "warehouse"
  }
);

module.exports = mongoose.model('warehouse', WarehoueSchema);