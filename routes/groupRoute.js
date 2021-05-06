var express = require('express');
var router = express.Router();
const groupUserController = require("../controller/groupUsersController")
/* GET home page. */
// router.get('/', groupUserController.get);

router.post("/create", groupUserController.addgroup)
router.put("/update", groupUserController.editgroup)
router.put("/delete/:id", groupUserController.deletegroup)
router.get("/getAll", groupUserController.listGroup)
router.get("/get/:id", groupUserController.getOne)
module.exports = router;