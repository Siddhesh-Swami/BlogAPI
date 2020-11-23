const {Users} = require('../models');
const {FollowTables} = require('../models');
const Sequelize = require('sequelize')


async function DisplayProfile(optUsername){
   
    const follow=await Users.findOne({
        attributes: ['email', 'username', 'bio', 'image'],
        where: {
            username : optUsername
        },
        include :[{model:FollowTables, attributes:['Following'] }]
        
        })

    // console.log(follow) 
    // const obj= JSON.stringify(follow[0], null, 4) 
    // console.log(obj) 

    return follow
}  

async function FollowProfile(follower, toFollow){

    const user = await Users.findOne({
        attributes: ['email', 'username'],
        where: {
            username: toFollow
      }
    })

    if(!user){throw new Error('No user with given username')}

    const followedProfile = await FollowTables.update(
        {Following: Sequelize.fn('CONCAT',Sequelize.col('Following'),' ',toFollow)},
        { where: {Follower : follower}}
    )

    console.log(followedProfile);

    if(followedProfile == 1) {
        return  {'message':'User followed'}
    }else {return  {'message':'User not followed'}}

}

async function UnfollowProfile(follower, toUnfollow){

    const user = await Users.findOne({
        attributes: ['email', 'username'],
        where: {
            username: toUnfollow
      }
    })

    if(!user){throw new Error('No user with given username')}

    const unfollowedProfile = await FollowTables.update(
        {Following: Sequelize.fn('REPLACE',Sequelize.col('Following'),toUnfollow,'')},
        { where: {Follower : follower}}
    )

    console.log(unfollowedProfile);

    if(unfollowedProfile == 1) {
        return  {'message':'User unfollowed'}
    }else {return  {'message':'User not unfollowed'}}

}

module.exports = {DisplayProfile, FollowProfile , UnfollowProfile};