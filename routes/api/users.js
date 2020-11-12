var router = require('express').Router();
var mysql = require('mysql2');
const {createUser,verifyUser} = require('../../controllers/users')


var con = require('../../app');

router.get("/test", function(req,res){
  res.send("test successful");
})

router.get('/user', (req, res) => {
  // TODO: Send current user using JWT
  
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

//TODO update user on Auth



module.exports = router;