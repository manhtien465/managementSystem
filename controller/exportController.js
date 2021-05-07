const Export = require("../schema/Export.schema")

module.exports = {
  create: async (req, res, next) => {
    const { productId, quantity, price, unit } = req.body
    const newExport = new Export({
      productId, quantity, price, unit
    })
    await newExport.save()
    res.json(newExport)
  },
  update: async (req, res, next) => {
    const { productId, id, quantity, price, unit } = req.body
    const newExport = Export.findByIdAndUpdate(id, {

      productId, quantity, price, unit
    },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false

      }
    )
    if (newExport) {
      return res.json({ msg: "update not successful" })
    }
    res.json({ newExport })
  },
  delete: async (req, res, next) => {
    const { id } = req.params
    const existExport = await Export.findById(id)
    if (!existExport) {
      res.status(400).json({ msg: "import not exist" })
    }
    await existExport.remove()
    return res.json({ msg: "delete Successful" })
  },
  getone: async (req, res, next) => {
    const { id } = req.params
    const existExport = await Export.findById(id)
    if (!existExport) {
      res.status(400).json({ msg: "import not exist" })
    }
    res.json(existExport)
  },
  getAll: async (req, res, next) => {
    res.json(req.advancedResults)
  }
}