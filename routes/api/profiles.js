var router = require('express').Router();

const {DisplayProfile} = require("../../controllers/users")


// Get a profile
router.get('/profiles/:username', async (req, res) => {
    
    const profile = await DisplayProfile(req.params.username);
    res.send(profile);
  })


router.get('/profiles/myprofile'), async(req,res) => {

}

router.post('/profiles/:username/follow'), (req,res) => {
    //TODO
}

router.delete('/profiles/:username/follow'), (req,res) => {
    //TODO
}
  
 module.exports = router; 
  