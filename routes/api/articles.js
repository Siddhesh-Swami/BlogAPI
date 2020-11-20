var router = require('express').Router();
const {authenticateToken} = require("../../middlewares/auth")
const {createArticle,getArticle}=require('../../controllers/articles')

//To Create an Article
router.post('/articles', authenticateToken , async function(req,res){
    console.log(req.body.article);
    if(req.user)
    {
      try {
        const createdArticle= await createArticle(req.body.article,req.user.username);
        res.send(createdArticle);
      } catch (err) {
        res.status(403).send({
          errors: {
            body: [ err.message ]
          }
        })
      }
    }
       
})

//To get an Article
router.get('/articles/:slug' , async function(req,res){
  try {
    const fetchedArticle= await getArticle(req.params.slug);
    res.send(fetchedArticle);
  } catch (err) {
    res.status(403).send({
      errors: {
        body: [ err.message ]
      }
    })
  }
})

module.exports = router;