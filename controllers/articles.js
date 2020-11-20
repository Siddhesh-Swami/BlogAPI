const SequelizeSlugify = require('sequelize-slugify')
const {Users, Articles} = require('../models');


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
 
  console.log(fetchedArticle)
  return fetchedArticle
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

module.exports = {createArticle, getArticle , deleteArticle, updateArticle}