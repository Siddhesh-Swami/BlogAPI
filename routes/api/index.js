var router = require('express').Router();

router.use("/", require("./users"));
// router.use("/api", require("./articles"));
// router.use("/api", require("./profiles"));
// router.use("/api", require("./tags"));

module.exports = router;