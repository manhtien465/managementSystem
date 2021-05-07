const Import = require("../schema/Import.schema")


module.exports = {
  create: async (req, res, next) => {
    const { productId, quantity, price, unit } = req.body
    const newimport = new Import({
      productId, quantity, price, unit
    })
    await newimport.save()
    res.json(newimport)
  },
  update: async (req, res, next) => {
    const { productId, id, quantity, price, unit } = req.body
    const newImport = Import.findByIdAndUpdate(id, {

      productId, quantity, price, unit
    },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false

      }
    )
    if (newImport) {
      return res.json({ msg: "updat not successful" })
    }
    res.json({ newimport })
  },
  delete: async (req, res, next) => {
    const { id } = req.params
    const existImport = await Import.findById(id)
    if (!existImport) {
      res.status(400).json({ msg: "import not exist" })
    }
    await existImport.remove()
    return res.json({ msg: "delete Successful" })
  },
  getone: async (req, res, next) => {
    const { id } = req.params
    const existImport = await Import.findById(id)
    if (!existImport) {
      res.status(400).json({ msg: "import not exist" })
    }
    res.json(existImport)
  },
  getAll: async (req, res, next) => {
    res.json(req.advancedResults)
  }
}