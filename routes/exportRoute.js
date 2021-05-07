var express = require('express');
var router = express.Router();
const ExportController = require("../controller/exportController")
const passport = require("passport")
const passportConf = require('../passport');
passport.authenticate("jwt", { session: false }),
  authorize("ADMIN", "SUPERADMIN"),
  /* GET home page. */
  router.post("/create",
    passport.authenticate("jwt", { session: false }),
    authorize("ADMIN", "SUPERADMIN"),
    ExportController.create);
router.put("/update",
  passport.authenticate("jwt", { session: false }),
  authorize("ADMIN", "SUPERADMIN"),
  ExportController.update)
router.delete("/delete/:id",
  passport.authenticate("jwt", { session: false }),
  authorize("ADMIN", "SUPERADMIN"),
  ExportController.delete)
router.get("/get/one/:id",
  passport.authenticate("jwt", { session: false }),
  authorize("ADMIN", "SUPERADMIN"),
  ExportController.getone)
router.get("/get/all",
  passport.authenticate("jwt", { session: false }),
  authorize("ADMIN", "SUPERADMIN"),
  ExportController.getAll)
module.exports = router;
