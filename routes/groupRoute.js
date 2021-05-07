var express = require('express');
var router = express.Router();
const groupUserController = require("../controller/groupUsersController")
const groupValidator = require("../validators/groupUser/group.validator")
const validator = require('express-joi-validation').createValidator({})
const { authorize } = require('../middleware/auth');
const passport = require("passport")
const passportConf = require('../passport');

/* GET home page. */
// router.get('/', groupUserController.get);

router.post("/create",
  passport.authenticate("jwt", { session: false }),
  authorize("CUSTOMER", "SUPERADMIN"),
  validator.body(groupValidator.validateCreateGroup),
  groupUserController.addgroup)

router.put("/update",
  passport.authenticate("jwt", { session: false }),
  authorize("ADMIN", "SUPERADMIN"),
  groupUserController.editgroup)

router.delete("/delete/:id",
  passport.authenticate("jwt", { session: false }),
  authorize("CUSTOMER", "SUPERADMIN"),
  groupUserController.deletegroup)

router.get("/getAll",
  passport.authenticate("jwt", { session: false }),
  authorize("CUSTOMER", "SUPERADMIN"),
  groupUserController.listGroup)
router.get("/get/:id",
  passport.authenticate("jwt", { session: false }),
  authorize("CUSTOMER", "SUPERADMIN"),
  groupUserController.getOne)
module.exports = router;