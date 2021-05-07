var express = require('express');
var router = express.Router();
const passport = require("passport")
const passportConf = require('../passport');
const OrderController = require("../controller/order.controller")
const { authorize } = require("../middleware/auth")
/* GET home page. */
router.post("/create",
  passport.authenticate("jwt", { session: false }),
  authorize("CUSTOMER", "ADMIN", "SUPERADMIN", "COLLABORATOR"),
  OrderController.checkout
)
router.put("/change/status",
  passport.authenticate("jwt", { session: false }),
  authorize("ADMIN", "SUPERADMIN"),
  OrderController.ChangeStatusOrder
)
router.delete("/delete/:id",
  passport.authenticate("jwt", { session: false }),
  authorize("ADMIN", "SUPERADMIN"),
  OrderController.deleteOrder
)
router.put("/canceled/",
  passport.authenticate("jwt", { session: false }),
  authorize("CUSTOMER", "ADMIN", "SUPERADMIN", "COLLABORATOR"),
  OrderController.cannceledOrder
)
router.get("/get/all",
  passport.authenticate("jwt", { session: false }),
  authorize("ADMIN", "SUPERADMIN", "COLLABORATOR"),
  OrderController.getAllOrders
)

module.exports = router;
