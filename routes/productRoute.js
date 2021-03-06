var express = require('express');
var router = express.Router();
const passport = require("passport")
const passportConf = require('../passport');
const ProductController = require("../controller/productController")
const validator = require('express-joi-validation').createValidator({})
const { authorize } = require('../middleware/auth');
/* GET home page. */
router.post("/create",
  passport.authenticate("jwt", { session: false }),
  authorize("ADMIN", "SUPERADMIN"),
  ProductController.addItem
)
router.put("/update",
  passport.authenticate("jwt", { session: false }),
  authorize("ADMIN", "SUPERADMIN"),
  ProductController.updateItem
)
router.delete("/delete/:id",
  passport.authenticate("jwt", { session: false }),
  authorize(["ADMIN", "SUPERADMIN"]),
  ProductController.deleteItem
)
router.get("/get/one/:id",
  passport.authenticate("jwt", { session: false }),
  authorize("ADMIN", "SUPERADMIN"),
  ProductController.getone
)
router.get("/get/all",
  passport.authenticate("jwt", { session: false }),
  authorize("CUSTOMER", "ADMIN", "SUPERADMIN"),
  ProductController.getItems
)

module.exports = router;
