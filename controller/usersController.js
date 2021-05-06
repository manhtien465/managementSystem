const User = require("../schema/users.schema")
const JWT = require("jsonwebtoken");
const key = require("../config/index")
const Items = require("../schema/Products.schema");

const tokenList = {};

const signToken = (users, exp) => {
  return JWT.sign({
    iss: "xoaycodeeasy",
    sub: users._id,
    iat: new Date().getTime(), // current time
    exp: exp, //Math.floor(Date.now() / 1000) + (60*60*12) 1h =60*60
  },
    key.secretkey, {
  }
  );
};
const refreshToken = (users, exp) => {
  return JWT.sign({
    iss: "refreshToken",
    sub: users._id,
    iat: new Date().getTime(),
    exp: exp // Math.floor(Date.now() / 1000) + (60*60*12)
  },
    key.refreshtoken
  )
}

module.exports = {
  currentUser: async (req, res, next) => {
    const user = await User.findById(req.user._id)
    res.json(user)
  },
  deleteUser: async (req, res, next) => {
    const { id } = req.params;
    const existUser = await User.findById(id)
    if (existUser._id === req.user._id) {
      res.status(404).json({ msg: "not not delete user self" })
    }
    if (!existUser) {
      res.json(404).json({ msg: "user not found" })
    }
    await existUser.remove()
    res.json({ msg: "success" })
  },
  updateUser: async (req, res, next) => {
    const { id } = req.body

    let updateItem = await User.findByIdAndUpdate(id, {
      ...req.body,
    },
      {
        useFindAndModify: false,
        new: true,
        runValidators: true
      }
    )

    if (!updateItem) {
      return res.json({ msg: "not found" })
    }
    res.json(updateItem)
  },
  getAlluser: async (req, res, next) => {

    res.json(res.advancedResults)
  },
  createuser: async (req, res, next) => {
    const { email } = req.body;

    const user = await User.findOne({
      email: email
    })
    if (user) {
      return res.status(400).json({
        msg: "Email has already exist"
      })
    }
    var newuser = new User({
      ...req.body
    })
    const result = await newuser.save();

    return res.json({
      user: newuser

    })


  },
  login: async (user, res, next) => {

    try {
      const expToken = Math.floor(Date.now()) + (key.timeExpToken * 1000)
      const expRefreshToken = Math.floor(Date.now()) + (key.timeExpRefreshtoken * 1000)
      const token = signToken(user, expToken)
      const refreshtoken = refreshToken(user, expRefreshToken)

      res.status(200).json({
        token: token,
        user: user,
        refreshToken: refreshtoken,
        expToken: key.timeExpToken,
        expRefreshToken: key.timeExpRefreshtoken
      })

    } catch (error) {

      console.log(error);
      res.status(500).json({
        msg: "error"
      })
    }


    // console.log(tokenList);  
    //    res.status(200).json({token:token,user:req.user,refreshToken:refreshtoken})

  },

  banUser: async (req, res, next) => {
    const { id, ban } = req.body

    const updateuser = await User.findByIdAndUpdate(id, {
      isBan: ban
    })
    if (!updateuser) {
      res.status(400).json({ msg: "user not found" })
    }
    res.json(updateuser)
  }




  // },
}