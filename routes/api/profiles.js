var router = require('express').Router();


// Get a profile
router.get('/profiles/:username', (req, res) => {
    //TODO 
    res.send({
      "profile": {
        "username": req.params.username,
        "bio": "I work at statefarm",
        "image": "https://static.productionready.io/images/smiley-cyrus.jpg",
        "following": false
      }
    })
  })

router.post('/profiles/:username/follow'), (req,res) => {
    //TODO
}

router.delete('/profiles/:username/follow'), (req,res) => {
    //TODO
}
  
 module.exports = router; 
  