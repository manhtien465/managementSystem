var express = require('express');
var router = express.Router();
const UserController = require("../controller/usersController")
const advancedResults = require('../middleware/advancedResults');
const Users = require("../schema/users.schema")
/* GET users listing. */
const passport = require("passport")
const passportConf = require('../passport');
router.post('/create',
  UserController.createuser)

router.route("/login")
  .post((req, res, next) => {
    passport.authenticate('local', {
      session: false
    }, (err, user, info) => {
      if (err) return next(err);
      if (!user) return res.status(400).json(info)
      UserController.login(user, res, next)
    })(req, res, next);
  })

router.put("/update",
  passport.authenticate("jwt", {
    session: false
  }),
  UserController.updateUser
)

router.delete("/delete/:id", passport.authenticate("jwt", {
  session: false
}), UserController.deleteUser)

router.get("/getall", advancedResults(Users), UserController.getAlluser)

router.post("/ban", UserController.banUser)

router.get("/currentUser",
  passport.authenticate("jwt", {
    session: false
  }),
  UserController.currentUser
)


module.exports = router;