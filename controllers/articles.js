const SequelizeSlugify = require('sequelize-slugify')
const {Users, Articles,FollowTables} = require('../models');



async function createArticle(articleOpts,username) {
  if (!articleOpts.title) {
    throw new Error('Did not supply title')
  }
 
  SequelizeSlugify.slugifyModel(Articles, {
    source: ['title']
  });

  if (!articleOpts.description) {
    throw new Error('Did not supply description')
  }
  if (!articleOpts.body) {
    throw new Error('Did not supply body')
  }
 
  const article = await Articles.create({
    ...articleOpts, 
    authorUsername:username,
    userUsername: username
  })
 
  if (!article) {
    throw new Error('Error creating article')
  }
 
  const createdArticle = await Articles.findOne({
    attributes: ['title', 'description', 'body'],
    where: {
      title: article.title
    }
  })
 
  return {
    ...createdArticle.get(),
    
  }
}

async function getArticle(slug){
  const fetchedArticle = await Articles.findOne({
    attributes: ['slug', 'title', 'description', 'body','createdAt','updatedAt'],
      where : {
          slug : slug
      },
      include: [{model:Users, as:'author',attributes:['username','bio','image'] }]
  })
  
  if(fetchedArticle != null){
    console.log(fetchedArticle)
    return fetchedArticle
  }else{
    return {'status':'No Article found with the following Slug'}
  }

  
} 

async function deleteArticle(slug, username){

  // get the logged in user
  const user = await Users.findOne({
    where : {
      username : username 
    }
  })

  // to get the article via slug 
  const article = await Articles.findOne({
    where : {
      slug : slug
    }
  })

  if(!article)
  {throw new Error('No article found with the following name')};

  console.log(article);
  console.log(user);
  //If the user name of logged in user and article username does not match, throw an error
  if(user.username != article.userUsername)
  {throw new Error('Cannot delete SomeOne Else\'s Article \n Please Provide Slug of your article only')};

  const deletedArticle = await Articles.destroy({
      where : {
          slug : slug
      }
  })

  if(deletedArticle == 0) return {'message':'No Article Deleted'};
  else return {'message':'Article has been Deleted'};

}

async function updateArticle(slug,username,articleOpts){
  // get the logged in user
  const user = await Users.findOne({
    where : {
      username : username 
    }
  })

  // to get the article via slug 
  const article = await Articles.findOne({
    where : {
      slug : slug
    }
  })

  if(!article)
  {throw new Error('No article found with the following name')};

  if(user.username != article.userUsername)
  {throw new Error('Cannot update SomeOne Else\'s Article \n Please Provide Slug of your article only')};

  const updatedArticle = await Articles.update(articleOpts,{
    where : {
      slug : slug
    }
  })

  if(updatedArticle ==1)
  {
    return getArticle(slug);
  }
  
}

async function getAllArticles(author,limit,offset){

  if(limit == undefined) {limit=20};
  if(offset == undefined) {offset=0};
  if(author == undefined)
  {
    const allArticles = await Articles.findAll({
      attributes: ['slug', 'title', 'description', 'body','createdAt','updatedAt'],
      include: [{model:Users, as:'author',attributes:['username','bio','image'] }],
      limit : parseInt(limit),
      offset : parseInt(offset),
      order: [['updatedAt', 'DESC']]
    })

    if(allArticles.length == 0){
      return {'status':'No articles found'}
    }
    else return allArticles;
    // console.log('1')
    // console.log(limit)
    
  }else{
    const allArticles = await Articles.findAll({
      attributes: ['slug', 'title', 'description', 'body','createdAt','updatedAt'],
      where: {authorUsername : author},
      include: [{model:Users, as:'author',attributes:['username','bio','image'] }],
      limit : parseInt(limit),
      offset : parseInt(offset),
      order: [['updatedAt', 'DESC']]
    })
    console.log('2')

    if(allArticles.length == 0)
    {return {'status':'No articles by given author was found'}}
    else return allArticles; 
    
  }

}

async function feedArticles(follower,limit,offset){

  if(limit == undefined) {limit=20};
  if(offset == undefined) {offset=0};

  const usersFollowing=await Users.findOne({
    attributes: ['username'],
    where: {
      username : follower
  },
  include :[{model:FollowTables, attributes:['Following'] }] 
  })

  const followingStr = usersFollowing.followtables[0].Following;

  const arr = followingStr.split(',');
  const finalArr = arr.shift();

  console.log(arr);
  let finalArticleList= [];
  for(var i=0; i<arr.length;i++){
    const allArticles = await Articles.findAll({
      attributes: ['slug', 'title', 'description', 'body','createdAt','updatedAt'],
      where: {authorUsername : arr[i]},
      include: [{model:Users, as:'author',attributes:['username','bio','image'] }],
      limit : parseInt(limit),
      offset : parseInt(offset),
      order: [['updatedAt', 'DESC']]
    })
    console.log(i+'\n\n\n')  
    finalArticleList.push(allArticles);
  }

  console.log(finalArticleList)
  return finalArticleList

}

module.exports = {createArticle, getArticle , deleteArticle, updateArticle, getAllArticles,feedArticles}