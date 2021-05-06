const User = require("../schema/users.schema")
const fs = require("fs")
const Product = require("../schema/Products.schema");

// const Model = require("../schema/models.schema");
// const Tier_variation = require("../schema/tier_variations.schema")

// { v4: uuidv4 } = require('uuid');
const Combo = require("../schema/Combo.schema");
const Services = require("../schema/Services.shema")
module.exports = {

  getItems: async (req, res, next) => {
    res.status(200).json(res.advancedResults)
  },
  /**
   * @URL /item/get-one/:id
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  getone: async (req, res, next) => {
    const { id } = req.params
    console.log(id);
    const item = await Product.findById(id).populate("models").populate("category").populate("tier_variations")
    res.json(item)
  },

  /**
  * @URL /item/create
  * @method post
  * @param {name,priceMin,priceMax,discount,sold,category}
  */
  addItem: async (req, res, next) => {

    let { price, name, desc, category, discount, stock, attributes, images, combo, services } = req.body

    let newServices = []
    let newCombo = []
    const newitem = new Product({
      price, discount, name, desc, stock, category, attributes, images, services, combo: newCombo
    })
    if (combo) {
      combo.map((v, i) => {

        v.productId = newitem._id
      })
      let insertManyCombo = await Combo.insertMany(combo)
      insertManyCombo.map((v, i) => {
        newCombo.push(v._id)
      })
    }
    if (services) {
      services.map((v, i) => {
        services.itemId = newitem._id

        // let newtier_variation = new Tier_variation({
        //     ...v
        // })
      })
      let insertManyServices = await Services.insertMany(services)

      insertManyServices.map((v, i) => {
        newServices.push(v._id)
      })
    }
    newitem.combo = newmodel
    newitem.services = newServices
    await newitem.save()

    res.json({ item: newitem, msg: "Add succesful !!!" })
  },


  updateItem: async (req, res, next) => {

    let {
      id, price, discount
    } = req.body

    const itemsupdate = await Product.findByIdAndUpdate(id,
      {
        $set: req.body,
      }
      , {
        useFindAndModify: false,
        new: true,
        runValidators: true
      })
    if (!itemsupdate) {
      return res.json({
        msg: "item not  found"
      })
    }

    res.json({
      itemsupdate: itemsupdate,
    })
  },
  deleteItem: async (req, res, next) => {

    const { id } = req.params

    try {
      const product = await Product.findById(id)
      if (!items) {
        return res.json({
          msg: "item not found"
        })
      }

      await product.remove();
      const combo = await Combo.deleteMany({ productId: id })
      const services = await Services.deleteMany({ productId: id })
      res.json({
        product, msg: "remove successful"
      })

    } catch (error) {
      res.json({ msg: "some problem" })
    }
  }
}