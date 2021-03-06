var express = require('express');
var router = express.Router();
const ServiceController = require("../controller/ServiceController")
const { authorize } = require('../middleware/auth');
const passport = require("passport")
const passportConf = require('../passport');
passport.authenticate("jwt", { session: false }),
  authorize("CUSTOMER", "ADMIN", "SUPERADMIN", "COLLABORATOR"),
  /* GET home page. */
  router.post("/create",
    passport.authenticate("jwt", { session: false }),
    authorize("CUSTOMER", "SUPERADMIN"),
    ServiceController.create);
router.put("/update",
  passport.authenticate("jwt", { session: false }),
  authorize("CUSTOMER", "SUPERADMIN"),
  ServiceController.update)
router.delete("/delete/:id",
  passport.authenticate("jwt", { session: false }),
  authorize("CUSTOMER", "SUPERADMIN"),
  ServiceController.delete)
router.get("/get/one/:id",
  passport.authenticate("jwt", { session: false }),
  authorize("CUSTOMER", "ADMIN", "SUPERADMIN", "COLLABORATOR"),
  ServiceController.getOneService)
router.get("/get/all",
  passport.authenticate("jwt", { session: false }),
  authorize("CUSTOMER", "ADMIN", "SUPERADMIN", "COLLABORATOR"),
  ServiceController.listAllServices)
module.exports = router;
