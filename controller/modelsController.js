const { validationResult } = require("express-validator");
const Product = require("../schema/Products.schema")
const Models = require("../schema/Model.schema")



module.exports = {
  /**
   * @url /model/add
   * @param {} req 
   * @param {*} res 
   * @param {*} next 
   */
  add: async (req, res, next) => {

    const { productId, barCode, price, sku } = req.body

    const model = new Models({
      productId, barCode, price, sku
    })
    await model.save()

    const updateItem = await Product.findByIdAndUpdate(productId, {
      $push: {
        models: model._id
      }
    }, {
      useFindAndModify: false,
      new: true,
      runValidators: true,
    })
    if (!updateItem) {
      return res.json({ msg: " item not found" })
    }

    res.json({ model: model, item: updateItem });
  },
  update: async (req, res, next) => {

    const { id, productId, barCode, price, sku } = req.body


    const model = await Models.findByIdAndUpdate(id, {
      productId, barCode, price, sku
    },
      {
        useFindAndModify: false,
        new: true,
        runValidators: true,
      }
    )
    if (!model) {
      return res.status(400).json({ msg: "model not found" })
    }
    res.json(model)


  },
  delete: async (req, res, next) => {

    try {
      const { id } = req.params
      const model = await Models.findById(id)
      if (!model) {
        return res.status(400).json({ msg: "not found" })
      }
      await model.remove()
      const item = await Product.findByIdAndUpdate(model.productId, {
        $pull: {
          models: model._id
        }
      },
        {
          useFindAndModify: false,
          new: true,
          runValidators: true,
        })
      res.json({ msg: "successful", item })

    } catch (error) {
      res.status(400).json({ msg: "error" })
    }
  }
}