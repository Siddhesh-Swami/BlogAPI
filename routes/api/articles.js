var router = require('express').Router();
const {authenticateToken} = require("../../middlewares/auth")

//create a post
//to complete
router.post('/articles', authenticateToken ,function(req,res){
    console.log(req.body.article);

    createArticle(req.body.article)
    /*
    {
        "article": {
          "title": "How to train your dragon",
          "description": "Ever wonder how?",
          "body": "You have to believe"
        }
      }
      */
})


module.exports = router;