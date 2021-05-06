const mongoose = require('mongoose')
var bcrypt = require("bcryptjs")

const Schema = mongoose.Schema;

var group_users_schema = new Schema({
  name: {
    type: String,
  },
  discount: {
    type: Number,
  }
},
  {
    timestamps: true,
  },
  {
    collection: "GroupsUsers"
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);



module.exports = mongoose.model('GroupsUsers', group_users_schema);