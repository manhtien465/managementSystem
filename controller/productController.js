const User = require("../schema/users.schema")
const Product = require("../schema/Products.schema");
const Combo = require("../schema/Combo.schema");
const Services = require("../schema/Services.shema");
const Model = require("../schema/Model.schema");

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
    const item = await Product.findById(id).populate("services").populate("combo").populate("categories")
    res.json(item)
  },

  /**
  * @URL /item/create
  * @method post
  * @param {name,priceMin,priceMax,discount,sold,category}
  */
  addItem: async (req, res, next) => {

    let { price, productCode, barCode, name, description, category, discount, models, attributes, images, combo, services, warehouseId, sku, location, unit, costPrice, quantity } = req.body

    let newServices = []
    let newCombo = []
    let newModel = []

    const newitem = new Product({
      price, discount, productCode, barCode, name, description, category, attributes, images, services, combo: newCombo, warehouseId, sku, location, unit, costPrice, quantity
    })

    if (models) {
      models.map((v, i) => {

        v.productId = newitem._id
      })
      let insertModel = await Model.insertMany(models)
      insertModel.map((v, i) => {
        newModel.push(v._id)
      })
    }
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
      })
      let insertManyServices = await Services.insertMany(services)

      insertManyServices.map((v, i) => {
        newServices.push(v._id)
      })
    }
    newitem.combo = newCombo
    newitem.services = newServices
    newitem.models = newModel
    await newitem.save()

    res.json({ item: newitem, msg: "Add succesful !!!" })
  },


  updateItem: async (req, res, next) => {

    let {
      id
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
      if (!product) {
        return res.json({
          msg: "item not found"
        })
      }

      await product.remove();
      const models = await Model.deleteMany({ productId: id })
      const combo = await Combo.deleteMany({ productId: id })
      const services = await Services.deleteMany({ productId: id })
      res.json({
        product, msg: "remove successful"
      })

    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: "some problem" })
    }
  }
}