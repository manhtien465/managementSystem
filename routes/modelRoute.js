var express = require('express');
var router = express.Router();
const ModelsController = require("../controller/modelsController")
const passport = require("passport")
const passportConf = require('../passport');
const { authorize } = require('../middleware/auth');

/* GET home page. */
router.post('/add',
  passport.authenticate("jwt", { session: false }),
  authorize("ADMIN", "SUPERADMIN"),
  ModelsController.add)
router.put("/update",
  passport.authenticate("jwt", { session: false }),
  authorize("ADMIN", "SUPERADMIN"),
  ModelsController.update
)
router.delete("/delete/:id",
  passport.authenticate("jwt", { session: false }),
  authorize("ADMIN", "SUPERADMIN"),
  ModelsController.delete
)
module.exports = router;
