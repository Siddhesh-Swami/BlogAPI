var router = require('express').Router();
const {authenticateToken} = require("../../middlewares/auth")
const {createArticle,getArticle, deleteArticle, updateArticle,getAllArticles,feedArticles}=require('../../controllers/articles')

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

//To get Feed
// same routes with :params are kept lower in the code // refer to get an article
router.get('/articles/feed',authenticateToken ,async (req,res) =>{
 
  const limit = req.query.limit;
  const offset = req.query.offset;

  if(req.user){
    try {
      const articles = await feedArticles(req.user.username,limit,offset);
      res.send(articles);
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

//To delete an Article
router.delete('/articles/:slug' , authenticateToken , async function(req,res){
  if(req.user)
  {
    try {
      const deletedArticle = await deleteArticle(req.params.slug,req.user.username);
      res.send(deletedArticle);
    } catch (err) {
      res.status(403).send({
        errors: {
          body: [ err.message ]
        }
      })
    } 
  }
})

//update an article via email
router.put('/articles/:slug' , authenticateToken , async function(req,res){
  if(req.user)
  {
    try {
      const updatedArticle = await updateArticle(req.params.slug,req.user.username,req.body.article);
      res.send(updatedArticle);
    } catch (err) {
      res.status(403).send({
        errors: {
          body: [ err.message ]
        }
      })
    } 
  }
})

//Get all articles
//Passing query params with ?
router.get('/articles',async (req,res) =>{
  const author = req.query.author;
  const limit = req.query.limit;
  const offset = req.query.offset;

  console.log(req.query);
  try {
    const articles = await getAllArticles(author,limit,offset);
    res.send(articles);
  } catch (err) {
    res.status(403).send({
      errors: {
        body: [ err.message ]
      }
    })
  }

})



module.exports = router;