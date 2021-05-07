const Combo = require("../schema/Combo.schema")
const Product = require("../schema/Products.schema")
module.exports = {
  create: async (req, res, next) => {
    const { productId, name, quantity, price } = req.body
    const exitsCombo = await Combo.findOne({ name })
    if (exitsCombo) {
      res.json({ msg: "name of service already exist" })
    }
    let newcombo = new Combo({
      name, quantity, price, productId
    })

    const updareItem = await Product.findByIdAndUpdate(productId, { $push: { combo: newcombo._id } })
    if (!updareItem) {
      return res.json({ msg: "update in product failt" })
    }
    await newcombo.save()
    res.json(newcombo)
  },
  update: async (req, res, next) => {
    const { id, name, productId, quantity } = req.body
    const updateCombo = await Combo.findByIdAndUpdate(id, {
      name, productId, quantity
    })
    if (!updateCombo) {
      return res.json({ msg: "update not successful" })
    }
  },
  delete: async (req, res, next) => {
    const { id } = req.params
    const combo = await Combo.findById(id)
    if (!group) {
      return res.json({ msg: "combo not found" })
    }
    await combo.remove()
    res.json({ msg: "delete Susccessful", combo: combo })
  },
  listAllCombo: async (req, res, next) => {
    res.json(req.advancedResults)
  },
  getOneCombo: async (req, res, next) => {
    const { id } = req.params
    const combo = await Combo.findById(id)
    if (!combo) {
      return res.json({ msg: "combo not found" })
    }
    return res.json(combo)

  }

}