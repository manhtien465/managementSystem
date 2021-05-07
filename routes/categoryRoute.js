var express = require('express');
var router = express.Router();
const CategoryController = require("../controller/categoryController")
const passport = require("passport")
const passportConf = require('../passport');
const { authorize } = require("../middleware/auth")

router.post("/create",
  passport.authenticate("jwt", { session: false }),
  authorize(["ADMIN", "SUPERADMIN"]),
  CategoryController.add
)

router.put("/update",
  passport.authenticate("jwt", { session: false }),
  authorize(["ADMIN", "SUPERADMIN"]),
  CategoryController.update
)

router.put("/update-parent",
  passport.authenticate("jwt", { session: false }),
  authorize(["ADMIN", "SUPERADMIN"]),
  CategoryController.updateParent
)

router.get("/get",
  passport.authenticate("jwt", { session: false }),
  authorize(["CUSTOMER", "ADMIN", "SUPERADMIN", "COLLABORATOR"]),
  CategoryController.get
)

router.get("/get-sub/:id",
  passport.authenticate("jwt", { session: false }),
  authorize(["CUSTOMER", "ADMIN", "SUPERADMIN", "COLLABORATOR"]),
  CategoryController.getSub
)

router.put("/set-order",
  passport.authenticate("jwt", { session: false }),
  authorize(["ADMIN", "SUPERADMIN"]),
  CategoryController.setOrder
)
router.delete("/delete",
  passport.authenticate("jwt", { session: false }),
  authorize(["ADMIN", "SUPERADMIN"]),
  CategoryController.delete
)
router.get("/get/list/recommend",
  passport.authenticate("jwt", { session: false }),
  authorize(["CUSTOMER", "ADMIN", "SUPERADMIN", "COLLABORATOR"]),
  CategoryController.getList)


module.exports = router