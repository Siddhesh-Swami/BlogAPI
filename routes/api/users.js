var router = require('express').Router();

router.get("/users", function(req,res){
	res.send("Hello World");
});

module.exports = router;