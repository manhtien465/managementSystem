var express = require('express');
var router = express.Router();
const ImportController = require("../controller/importController")
/* GET home page. */
router.post("/create", ImportController.create);
router.put("/update", ImportController.update)
router.delete("/delete/:id", ImportController.delete)
router.get("/get/one/:id", ImportController.getOneService)
router.get("/get/all", ImportController.listAllServices)
module.exports = router;
