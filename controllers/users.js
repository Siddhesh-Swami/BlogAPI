const {Users} = require('../models');
const {createJwt} = require('../middlewares/auth');

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
    
      const createdUser = await Users.findOne({
        attributes: ['email', 'username', 'bio', 'image'],
        where: {
          username: user.username
        }
      })
      const token = await createJwt(createdUser.get())
    
      return {
        ...createdUser.get(),
        token
      }
}

async function verifyUser(options) {
    if (!options.email) {
      throw new Error('Did not supply email')
    }
    if (!options.password) {
      throw new Error('Did not supply password')
    }
  
    const user = await Users.findOne({
        attributes: ['email', 'username', 'bio', 'image', 'password'],
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
  
    const token = await createJwt(user.get())
    const userJson = {
        ...user.get(),
        token
    }
    delete userJson.password
    return userJson
}

async function updateUser(options){
    
    // const user = await Users.findOne({
    //     attributes: ['email', 'username', 'bio', 'image', 'password'],
    //     where: {
    //         email: options.email
    //   }
    // })

    // if (!user) {
    //     throw new Error('No user with given email address')
    // }

    const updatedUser = await Users.update(options, {
        where: {
        email : options.email 
        }
    });

    const user_updated = 
        await Users.findOne({
        attributes: ['email', 'username', 'bio', 'image'],
        where: {
            email:  options.email 
        }
    })
    
    return user_updated;  

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
    createUser, verifyUser ,getUser , updateUser
  }