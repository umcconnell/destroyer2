let express = require("express");
let router = express.Router();

router.use("/api", require("./api"));

module.exports = router;
