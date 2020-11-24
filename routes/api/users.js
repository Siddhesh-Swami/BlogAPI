var router = require('express').Router();
var mysql = require('mysql2');
const {createUser,verifyUser,updateUser,getUser} = require('../../controllers/users')
const {authenticateToken} = require("../../middlewares/auth")

// var con = require('../../app');

//Get Current User
router.get('/user',authenticateToken,async (req, res) => {
  if(req.user){
    const User = await getUser(req.user.username);
    res.send(User)
  }
})

//Working
//REGISTRATION of USER
router.post('/users', async (req, res) => {
  const createdUser = await createUser(req.body);
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