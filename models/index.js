// dotenv to hide private apikeys & passwords
// require('dotenv').config()
const path = require('path');
require('dotenv').config({
  path: path.resolve('config.env'),
});
const Sequelize = require('sequelize')

//remove OR condition of Host while building docker container
const db = new Sequelize({
  host : 'host.docker.internal'| process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: 'mysql'
})

//Creating Models in Sequelize 
const Users = db.define('user', {
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    },
    unique: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  bio: Sequelize.STRING,
  image: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Articles = db.define('article', {
  "slug": {
    type: Sequelize.STRING,
    primaryKey: true
  },
  "title": {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  "description": {
    type: Sequelize.STRING(100),
  },
  "body": Sequelize.STRING,
})

const FollowTables = db.define('followtable',{
  "Follower": {
      type: Sequelize.STRING(50),
  primaryKey: true
  },
  "Following":{
      type: Sequelize.STRING(50)
  }
})
/*
const Comments = db.define('comment', {
  body: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const Tags = db.define('tag', {
  name: {
    type: Sequelize.STRING,
    primaryKey: true
  }
})
*/

// Comments.belongsTo(Articles)
// Articles.hasMany(Comments)

// Comments.belongsTo(Users, { as: 'author' })

Articles.belongsTo(Users, { as: 'author' })
Users.hasMany(Articles)

FollowTables.belongsTo(Users, {foreignKey:'Follower'});
Users.hasMany(FollowTables,{foreignKey:'Follower'});

// FollowTables.create({Follower:"sid", Following:"sid2"});


/*
Articles.belongsToMany(Users, { through: 'favourites' })
Users.belongsToMany(Articles, { through: 'favourites' })

Articles.belongsToMany(Tags, { through: 'article_tags' })
Tags.belongsToMany(Articles, { through: 'article_tags' })
*/
module.exports = {
  db,
  Users, Articles, FollowTables
}

