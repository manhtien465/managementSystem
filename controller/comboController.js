const Combo = require("../schema/combo.shema")
module.exports = {
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