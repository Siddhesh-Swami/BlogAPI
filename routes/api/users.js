var router = require('express').Router();
var mysql = require('mysql2');
const {createUser,verifyUser,updateUser} = require('../../controllers/users')
const {authenticateToken} = require("../../middlewares/auth")

// var con = require('../../app');

router.get('/user',authenticateToken, (req, res) => {
  // TODO: remove password
  if(req.user){
    res.send(req.user)
  }
})

//Working
//REGISTRATION of USER
router.post('/users', async (req, res) => {
  const createdUser = await createUser({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
  res.send(createdUser)
})

//Authentication
//Working 
router.post('/users/login', async (req, res) => {
  try {
    const verifiedUser = await verifyUser(req.body.user)
    res.send(verifiedUser)
  } catch (err) {
    res.status(403).send({
      errors: {
        body: [ err.message ]
      }
    })
  }
})


router.put('/user',authenticateToken, async (req,res)=> {

  if(req.user)
  {
    try{
      const updatedUser = await updateUser(req.body.user)
      if(updatedUser != null)
      {
        res.send(
          {status:"successfully updated details",updatedUser}
          )
      }
      else{
        res.send({
          errors: {
            body: [ "User with this email id does not exist in Database" ]
          }
        })
      }
      
    }catch(err){
      res.status(403).send({
        errors: {
          body: [ err.message ]
        }
      })
    }
  }
  
})



module.exports = router;