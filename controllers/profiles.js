const {Users} = require('../models');
const {FollowTables} = require('../models');


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



module.exports = {DisplayProfile};