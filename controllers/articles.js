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

module.exports = {createArticle, getArticle}