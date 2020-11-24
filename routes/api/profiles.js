var router = require('express').Router();

const {authenticateToken} = require("../../middlewares/auth")
const {DisplayProfile, FollowProfile,UnfollowProfile} = require("../../controllers/profiles")


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

router.get('/profile/myprofile', authenticateToken, async (req,res) => {
    if(req.user)
    {
        try {
            const profile = await DisplayProfile(req.user.username);
            res.send(profile);
          } catch (err) {
            res.status(403).send({
              errors: {
                body: [ err.message ]
              }
            })
          }
    }
})

router.post('/profiles/:username/follow',authenticateToken,async (req,res) => {
    
    if(req.user)
    {
        try {
            const followedProfile = await FollowProfile(req.user.username,req.params.username);
            res.send(followedProfile);
          } catch (err) {
            res.status(403).send({
              errors: {
                body: [ err.message ]
              }
            })
          }
    }
})

router.delete('/profiles/:username/follow', authenticateToken, async (req,res) => {
    if(req.user)
    {
        try {
            const unfollowedProfile = await UnfollowProfile(req.user.username,req.params.username);
            res.send(unfollowedProfile);
          } catch (err) {
            res.status(403).send({
              errors: {
                body: [ err.message ]
              }
            })
          }
    }
    

})
  
 module.exports = router; 
  