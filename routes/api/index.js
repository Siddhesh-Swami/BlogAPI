var router = require('express').Router();

router.use("/", require("./users"));
router.use("/", require("./articles"));
router.use("/", require("./profiles"));


module.exports = router;