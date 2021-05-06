var express = require('express');
var router = express.Router();
const CategoryController = require("../controller/categoryController")
const passport = require("passport")
const passportConf = require('../passport');

router.post("/create",
  CategoryController.add
)

router.put("/update",
  CategoryController.update
)

router.put("/update-parent",
  CategoryController.updateParent
)

router.get("/get",
  CategoryController.get
)

router.get("/get-sub/:id",
  CategoryController.getSub
)

router.put("/set-order",
  CategoryController.setOrder
)
router.delete("/delete",
  CategoryController.delete
)
router.get("/get/list/recommend", CategoryController.getList)


module.exports = router