const {Users} = require('../models');

async function createUser(options){
    if(!options.username){
        throw new Error('username not provided')
    }
    if (!options.email) {
        throw new Error('email not provided')
      }
    if (!options.password) {
        throw new Error('password not provided')
      }

      const user =await Users.create({
        ...options
      })
    
      if (!user) {
        throw new Error('Error creating user')
      }
    
      return user
}

async function verifyUser(options) {
    if (!options.email) {
      throw new Error('Did not supply email')
    }
    if (!options.password) {
      throw new Error('Did not supply password')
    }
  
    const user = await Users.findOne({
      where: {
        email: options.email
      }
    })
    if (!user) {
      throw new Error('No user with given email address')
    }
  
    if (user.password !== options.password) {
      throw new Error('Password does not match')
    }
  
    return user
  }

async function getUser(optUsername){
    const user = await Users.findOne({
        where : {
            username : optUsername
        }
    })

    return user
}  

module.exports = {
    createUser, verifyUser ,getUser
  }