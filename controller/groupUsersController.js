const GroupUsers = require("../schema/GroupUsers.schema")
const Users = require("../schema/users.schema")


module.exports = {
  addgroup: async (req, res, next) => {
    const { name, discount } = req.body
    const existNameGroup = await GroupUsers.findOne({ name })
    if (existNameGroup) {
      return res.json({ msg: "name of group already exist" })
    }
    const newGroup = new GroupUsers({
      name, discount
    })
    await newGroup.save()
    return res.json(newGroup)
  },
  editgroup: async (req, res, next) => {

    const { id, name, discount } = req.body
    const existNameGroup = await GroupUsers.findOne({ name })
    if (existNameGroup) {
      return res.json({ msg: "name of group already exist" })
    }
    const updateGroup = await GroupUsers.findByIdAndUpdate(id, {
      name, discount
    },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false

      }
    )
    if (!updateGroup) {
      return res.status(400).json({ msg: "update not successful" })
    }
  },
  deletegroup: async (req, res, next) => {
    const { id } = req.params
    const group = await GroupUsers.findById(id)
    if (!group) {
      return res.json({ msg: "group not found" })
    }
    const remove_all_user_of_Group = await Users.updateMany({ rank: id }, { $set: { rank: null } })
    await group.remove()
    res.json({
      msg: "remove successful", group
    })
  },
  listGroup: async (req, res, next) => {
    res.json(req.advancedResults)
  },
  getOne: async (req, res, next) => {
    const { id } = req.params
    const groupUser = await GroupUsers.findById(id)
    if (!groupUser) {
      return res.json({ msg: "not found" })
    }
    return res.json({ groupUser })
  }
}