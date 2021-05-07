const Product = require("../schema/Products.schema")
const Services = require("../schema/Services.shema")
module.exports = {
  create: async (req, res, next) => {
    const { productId, name, desc, price } = req.body
    const exitsService = await Services.findOne({ name })
    if (exitsService) {
      res.json({ msg: "name of service already exist" })
    }
    let newservice = new Services({
      name, desc, price, productId
    })

    const updareItem = await Product.findByIdAndUpdate(productId, { $push: { services: newservice._id } })
    if (!updareItem) {
      return res.json({ msg: "update in product failt" })
    }
    await newservice.save()
    res.json(newservice)
  },
  update: async (req, res, next) => {
    const { id, name, desc, price } = req.body
    const updateService = await Services.findByIdAndUpdate(id, {
      name, desc, price
    })
    if (!updateService) {
      return res.json({ msg: "update not successful" })
    }
  },
  delete: async (req, res, next) => {
    const { id } = req.params
    const service = await Services.findById(id)
    if (!service) {
      return res.json({ msg: "group not found" })
    }
    await service.remove()
    return res.json({ msg: "delete successful", service })
  },
  listAllServices: async (req, res, next) => {
    res.json(req.advancedResults)
  },
  getOneService: async (req, res, next) => {
    const { id } = req.params
    const service = await Services.findById(id)
    if (!service) {
      return res.json({ msg: "combo not found" })
    }
    return res.json(service)

  }
}