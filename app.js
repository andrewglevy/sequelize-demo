// % node app.js

const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const Article = connection.define('article', {
  title: Sequelize.STRING,
  body: Sequelize.TEXT,
});

connection.sync().then(function (){
  // Article.create({
  //   title: 'demo title',
  //   body: 'asdfASDF.'

  // Article.findByPk(1)
  //   .then(function(article) {
  //     console.log(article.dataValues);
  //   });

  Article.findAll().then(function(articles) {
    console.log(articles.length);
  });
}).catch(err => console.log('An error occurred: \n' + err.message));
