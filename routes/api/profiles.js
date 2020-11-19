var router = require('express').Router();

const {authenticateToken} = require("../../middlewares/auth")
const {DisplayProfile} = require("../../controllers/profiles")


// Get a profile
router.get('/profiles/:username', async (req, res) => {
    try {
        const profile = await DisplayProfile(req.params.username);
        res.send(profile);
      } catch (err) {
        res.status(403).send({
          errors: {
            body: [ err.message ]
          }
        })
      }
  })

router.post('/profiles/:username/follow'), (req,res) => {
    //TODO
}

router.delete('/profiles/:username/follow'), (req,res) => {
    //TODO
}
  
 module.exports = router; 
  