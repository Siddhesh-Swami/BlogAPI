var router = require('express').Router();

const {getUser} = require("../../controllers/users")


// Get a profile
//Partially working
//  TODO hide password and show following

router.get('/profiles/:username', async (req, res) => {
    //TODO 
    const profile = await getUser(req.params.username);
    res.send(profile);
  })

router.post('/profiles/:username/follow'), (req,res) => {
    //TODO
}

router.delete('/profiles/:username/follow'), (req,res) => {
    //TODO
}
  
 module.exports = router; 
  