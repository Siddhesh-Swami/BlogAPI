const {Users, Articles} = require('../models');

//to complete
async function createArticle(options){
    if (!options.slug) {
        throw new Error('Did not supply slug')
      }
      if (!options.title) {
        throw new Error('Did not supply title')
      }




}