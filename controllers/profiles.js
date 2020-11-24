const {Users} = require('../models');
const {FollowTables} = require('../models');
const Sequelize = require('sequelize')
const { Op } = require("sequelize");


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

    // const userss = await FollowTables.findOne({
    //     where :
    // })
    // const output = Sequelize.fn('FIND_IN_SET',toFollow,Sequelize.fn('REPLACE',Sequelize.col('Following'),',',' '));
    // // REPLACE(Sequelize.col('Following'),',',' '))
    // console.log(output);

    const testUser = await FollowTables.findOne({
        where: {Follower : follower}        
    })

    if(!testUser)
    {
        await FollowTables.create({
                Follower : follower,
                Following : ''
        })
    }

    const alreadyFollowed =await FollowTables.findOne({
        where: {
            [Op.and]: [
              Sequelize.where( Sequelize.fn('FIND_IN_SET',toFollow,Sequelize.col('Following')),'>',0) ,
              { Follower: follower }
            ]
          }     
    })

    if(alreadyFollowed){throw new Error('This User is already Followed by you.')}
    console.log(alreadyFollowed)


    const followedProfile = await FollowTables.update(
        {Following: Sequelize.fn('CONCAT',Sequelize.col('Following'),',',toFollow)},
        { where: {Follower : follower}}
    )

    console.log(followedProfile);

    if(followedProfile == 1) {
        return  {
            'status':{
                'follwer_username':follower,
                'followed_username': toFollow
            },
            'message':'User followed'
        }
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

    const alreadyUnfollowed =await FollowTables.findOne({
        where: {
            [Op.and]: [
              Sequelize.where( Sequelize.fn('FIND_IN_SET',toUnfollow,Sequelize.col('Following')),'>',0) ,
              { Follower: follower }
            ]
          }     
    })
    console.log(alreadyUnfollowed)
    if(alreadyUnfollowed){

        const unfollowedProfile = await FollowTables.update(
            {Following: Sequelize.fn('REPLACE',Sequelize.col('Following'),','+toUnfollow,'')},
            { where: {Follower : follower}}
        )
    
        console.log(unfollowedProfile);
    
        if(unfollowedProfile == 1) {
            return  {
                'status':{
                    'follwer_username':follower,
                    'unfollowed_username': toUnfollow
                },
                'message':'User Unfollowed'
            }
        }else {return  {'message':'User not unfollowed'}}

    }else{
        throw new Error('This User is already unFollowed by you.')
        }

}

module.exports = {DisplayProfile, FollowProfile , UnfollowProfile};