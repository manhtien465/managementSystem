var express = require('express');
var router = express.Router();
const ComboController = require("../controller/comboController")
const passport = require("passport")
const passportConf = require('../passport');
const { authorize } = require('../middleware/auth');
passport.authenticate("jwt", { session: false }),
  authorize("ADMIN", "SUPERADMIN"),
  /* GET home page. */
  router.post("/create",
    passport.authenticate("jwt", { session: false }),
    authorize("ADMIN", "SUPERADMIN"),
    ComboController.create);
router.put("/update",
  passport.authenticate("jwt", { session: false }),
  authorize("ADMIN", "SUPERADMIN"),
  ComboController.update)
router.delete("/delete/:id",
  passport.authenticate("jwt", { session: false }),
  authorize("ADMIN", "SUPERADMIN"),
  ComboController.delete)
router.get("/get/one/:id",
  passport.authenticate("jwt", { session: false }),
  authorize("CUSTOMER", "ADMIN", "SUPERADMIN", "COLLABORATOR"),
  ComboController.getOneCombo)
router.get("/get/all",
  passport.authenticate("jwt", { session: false }),
  authorize("CUSTOMER", "ADMIN", "SUPERADMIN", "COLLABORATOR"),
  ComboController.listAllCombo)
module.exports = router;
