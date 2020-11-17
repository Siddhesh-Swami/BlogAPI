require('dotenv').config();

const jwt = require("jsonwebtoken");

const secret = process.env.SECRET;

async function createJwt(user){
    const token = await jwt.sign(user,secret)
    return token
}

async function verifyJwt(token){
    const user = jwt.verify(token , secret)
    return user
}

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(403).send({
        errors: {
          body: [
            'Only for logged in users. Please Log in'
          ]
        }
      })
    }
  
    const token = authHeader.split(' ')[1]
    try {
      const user = await verifyJwt(token)
      req.user = user
      return next()
    } catch (err) {
      res.status(403).send({
        errors: {
          body: [
            err
          ]
        }
      })
    }
  
  }

module.exports = {
  createJwt,
  verifyJwt,
  authenticateToken
}