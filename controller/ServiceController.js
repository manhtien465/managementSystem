const Services = require("../schema/Services.shema")
module.exports = {
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
    
  }
}